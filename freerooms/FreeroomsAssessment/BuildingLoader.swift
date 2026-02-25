//
//  BuildingLoader.swift
//  FreeroomsAssessment
//
//  Created by Anh Nguyen on 31/1/2025.
//

import Foundation

public class BuildingLoader {
    private var client: HttpClient
    private var url: URL
    
    public enum Error: Swift.Error {
        case connectivity, invalidData
    }
    
    public typealias Result = Swift.Result<[Building], Swift.Error>
    
    public init(client: HttpClient, url: URL) {
        self.client = client
        self.url = url
    }
    
    public func fetchBuildings() async -> Result  {
        let httpResult = await client.get(from: url)

        guard case .success((let data, let response)) = httpResult else {
            return .failure(Error.connectivity)
        }
        
        guard response.statusCode == 200 else {
            return .failure(Error.invalidData)
        }
        
        do {
            let remote = try JSONDecoder().decode([RemoteBuilding].self, from: data)
            let buildings = remote.map {
                Building(
                    name: $0.building_name,
                    id: $0.building_id.uuidString,
                    latitude: $0.building_latitude,
                    longitude: $0.building_longitude,
                    aliases: $0.building_aliases
                )
            }
            return .success(buildings)
        } catch {
            return .failure(Error.invalidData)
        }
    }
}
