package com.mediscan.views;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.RouterLink;

public class MainLayout extends AppLayout {

    public MainLayout() {
        createHeader();
        createDrawer();
    }

    private void createHeader() {
        H1 logo = new H1("MEDISCAN AI (Java Edition)");
        logo.addClassNames("text-l", "m-m");

        Span subtitle = new Span("Healthcare & Medicine Assistant");
        subtitle.getStyle().set("font-size", "12px").set("color", "gray");

        HorizontalLayout header = new HorizontalLayout(new DrawerToggle(), logo, subtitle);
        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.setWidthFull();
        header.addClassNames("py-0", "px-m");

        addToNavbar(header);
    }

    private void createDrawer() {
        RouterLink dashboardLink = new RouterLink("Dashboard", DashboardView.class);
        RouterLink chatLink = new RouterLink("AI Pharmacist Chat", ChatView.class);
        RouterLink remindersLink = new RouterLink("Reminders & Alarms", RemindersView.class);
        RouterLink searchLink = new RouterLink("1000+ Medicine Search", MedicineSearchView.class);

        VerticalLayout layout = new VerticalLayout(
            dashboardLink,
            chatLink,
            remindersLink,
            searchLink
        );

        addToDrawer(layout);
    }
}
