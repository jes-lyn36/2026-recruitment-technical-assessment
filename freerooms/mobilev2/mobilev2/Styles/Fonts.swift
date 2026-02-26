//
//  Fonts.swift
//  mobilev2
//
//  Created by Jesslyn Wu on 26/2/2026.
//
import SwiftUI

struct SmallHeadingStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.subheadline)
            .foregroundStyle(Color("DarkOrange"))
    }
}

struct HeadingStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.headline)
    }
}

struct HeadlineStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.system(size: 14, weight: .bold))
            .foregroundStyle(Color("DarkOrange"))
    }
}

struct SubHeadlineStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.subheadline)
            .foregroundStyle(Color("SlightlyLighterOrange"))
    }
}


struct SubheadingStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.subheadline)
            .foregroundStyle(.secondary)
    }
}

extension View {
    func smallheading() -> some View { modifier(SmallHeadingStyle()) }
    func heading() -> some View { modifier(HeadingStyle()) }
    func headline() -> some View { modifier(HeadlineStyle()) }
    func subheadline() -> some View { modifier(SubHeadlineStyle()) }
    func subheading() -> some View { modifier(SubheadingStyle()) }
}
