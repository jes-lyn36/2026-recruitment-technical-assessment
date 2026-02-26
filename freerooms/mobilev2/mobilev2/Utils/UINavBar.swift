//
//  UINavBar.swift
//  mobilev2
//
//  Created by Jesslyn Wu on 26/2/2026.
//
import SwiftUI

extension UINavigationBar {
    static func applyAppearance() {
        let appearance = UINavigationBarAppearance()

        appearance.largeTitleTextAttributes = [
            .foregroundColor: UIColor(Color.darkOrange)
        ]
        appearance.titleTextAttributes = [
            .foregroundColor: UIColor(Color.darkOrange)
        ]

        UINavigationBar.appearance().standardAppearance = appearance
        UINavigationBar.appearance().scrollEdgeAppearance = appearance
    }
}
