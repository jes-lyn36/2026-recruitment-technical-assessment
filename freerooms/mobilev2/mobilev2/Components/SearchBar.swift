//
//  SearchBar.swift
//  mobilev2
//
//  Created by Jesslyn Wu on 26/2/2026.
//
import SwiftUI

// Can't seem to change the colour of `.searchable` sooooo here we are
struct SearchBar: View {
    @Binding var text: String

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "magnifyingglass")
                .foregroundStyle(.black.opacity(0.3))

            TextField("Search...", text: $text)

            if !text.isEmpty {
                Button {
                    text = ""
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundStyle(.black.opacity(0.3))
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.vertical, 12)
        .padding(.horizontal, 12)
        .background(Color.searchBar)
        .clipShape(RoundedRectangle(cornerRadius: 30))
    }
}
