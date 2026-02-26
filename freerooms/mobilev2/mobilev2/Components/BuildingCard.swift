//
//  BuildingCard.swift
//  mobilev2
//
//  Created by Jesslyn Wu on 26/2/2026.
//
import SwiftUI

struct BuildingCard: View {
    let building: Building

    var body: some View {
        Button {
            print("Tapped \(building.name)")
        } label: {
            HStack(spacing: 0) {
                Image(building.id)
                    .resizable()
                    .scaledToFill()
                    .frame(width: 75, height: 60)
                    .clipShape(RoundedRectangle(cornerRadius: 6))

                VStack(alignment: .leading, spacing: 8) {
                    Text(building.name)
                        .headline()

                    Text("\(Int.random(in: 0...10)) rooms available")
                        .subheadline()
                }
                .padding(.leading, 15)

                Spacer()

                HStack(spacing: 0) {
                    Text(building.rating, format: .number.precision(.fractionLength(0...1)))
                        .subheadline()

                    Image(systemName: "star.fill")
                        .foregroundStyle(Color("StarYellow"))

                    Image(systemName: "chevron.right")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(Color("SlightlyLighterOrange").opacity(0.7))
                        .padding(.leading, 6)
                }
            }
            .padding(.vertical, 3)
        }
        .buttonStyle(.plain)
    }
}
