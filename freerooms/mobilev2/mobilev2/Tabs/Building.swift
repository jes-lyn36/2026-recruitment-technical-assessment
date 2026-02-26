//
//  Building.swift
//  mobilev2
//
//  Created by Jesslyn Wu on 26/2/2026.
//
import SwiftUI

struct BuildingTab: View {
    @State private var searchText = ""

    private let buildings: [Building] = Bundle.main.decode("BuildingData.json")

    private var buildingsBlock: some View {
        VStack(spacing: 0) {
            ForEach(buildings) { building in
                BuildingCard(building: building)
                    .padding(.vertical, 14)
                    .padding(.horizontal, 14)

                if building.id != buildings.last?.id {
                    Divider()
                        .padding(.leading, 105)
                        .padding(.trailing, 15)
                }
            }
        }
        .background(
            RoundedRectangle(cornerRadius: 28)
                .fill(.white)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .stroke(Color("FreeroomsOrange").opacity(0.35), lineWidth: 2)
        )
        .listRowInsets(EdgeInsets(top: 1, leading: 1, bottom: 1, trailing: 1))
        .listRowBackground(Color.clear)
    }

    var body: some View {
        NavigationStack {
            List {
                SearchBar(text: $searchText)
                    .listRowInsets(.init(top: 0, leading: 0, bottom: 0, trailing: 0))
                    .listRowBackground(Color.clear)

                Section {
                    buildingsBlock
                } header: {
                    Text("Upper campus").smallheading()
                }
            }
            .toolbar {
                ToolbarItemGroup(placement: .navigationBarTrailing) {
                    HStack {
                        Button(action: {}) {
                            Image(systemName: "arrow.up.arrow.down")
                        }

                        Button(action: {}) {
                            Image(systemName: "square.grid.2x2")
                                .resizable()
                                .frame(width: 25, height: 25)
                        }
                    }
                    .padding(6)
                }
            }
            .navigationTitle(Text("Buildings"))
        }
    }
}
