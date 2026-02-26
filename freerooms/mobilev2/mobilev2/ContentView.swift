//
//  ContentView.swift
//  mobilev2
//
//  Created by Jesslyn Wu on 26/2/2026.
//
import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            BuildingTab()
                .tabItem {
                    Label("Buildings", systemImage: "building.fill")
                }

            MapTab()
                .tabItem {
                    Label("Map", systemImage: "map")
                }

            RoomTab()
                .tabItem {
                    Label("Rooms", systemImage: "door.left.hand.closed")
                }
        }
        .tint(Color("FreeroomsOrange"))
    }
}

#Preview {
    ContentView()
}
