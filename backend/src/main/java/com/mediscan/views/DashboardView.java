package com.mediscan.views;

import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

@PageTitle("Dashboard | MEDISCAN AI Java")
@Route(value = "", layout = MainLayout.class)
@RouteAlias(value = "dashboard", layout = MainLayout.class)
public class DashboardView extends VerticalLayout {

    public DashboardView() {
        setSpacing(true);
        setPadding(true);

        add(new H2("Welcome to MEDISCAN AI (Pure Java App)"));
        add(new Paragraph("Manage your medications, search over 1,000+ medicines, set alarms, and chat with Gemini AI Pharmacist."));

        HorizontalLayout cards = new HorizontalLayout();
        cards.add(createCard("1,000+", "Medicines in Database", "#0EA5E9"));
        cards.add(createCard("Active", "Alarm Reminders", "#10B981"));
        cards.add(createCard("Multimodal", "Gemini AI Vision Chat", "#F59E0B"));

        add(cards);
    }

    private Div createCard(String title, String subtitle, String color) {
        Div card = new Div();
        card.getStyle()
            .set("background", "white")
            .set("border-radius", "16px")
            .set("padding", "24px")
            .set("box-shadow", "0 4px 12px rgba(0,0,0,0.08)")
            .set("border-left", "6px solid " + color)
            .set("width", "220px");

        H2 titleElem = new H2(title);
        titleElem.getStyle().set("margin", "0").set("color", color);

        Paragraph subElem = new Paragraph(subtitle);
        subElem.getStyle().set("margin", "4px 0 0 0").set("color", "gray");

        card.add(titleElem, subElem);
        return card;
    }
}
