//
//  Decoder.swift
//  mobilev2
//
//  Created by Jesslyn Wu on 26/2/2026.
//
struct Building: Identifiable, Decodable {
    let aliases: [String]
    let id: String
    let lat: Double
    let long: Double
    let name: String
    let rating: Double

    enum CodingKeys: String, CodingKey { case aliases, id, lat, long, name, rating }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        aliases = try c.decode([String].self, forKey: .aliases)
        id = try c.decode(String.self, forKey: .id)
        lat = try c.decode(Double.self, forKey: .lat)
        long = try c.decode(Double.self, forKey: .long)
        name = try c.decode(String.self, forKey: .name)
        rating = try c.decode(Double.self, forKey: .rating)
    }
}
