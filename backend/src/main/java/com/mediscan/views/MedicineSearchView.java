package com.mediscan.views;

import com.mediscan.model.Medicine;
import com.mediscan.repository.MedicineRepository;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

@PageTitle("1000+ Medicine Search | MEDISCAN AI Java")
@Route(value = "search", layout = MainLayout.class)
public class MedicineSearchView extends VerticalLayout {

    private final MedicineRepository repository;
    private final Grid<Medicine> grid = new Grid<>(Medicine.class);
    private final TextField filterText = new TextField();

    public MedicineSearchView(@Autowired MedicineRepository repository) {
        this.repository = repository;
        setSpacing(true);
        setPadding(true);

        add(new H2("💊 1,000+ MongoDB Medicine Database"));
        add(new Paragraph("Search across 1,000+ seeded medicines in MongoDB directly using pure Java Spring Data queries."));

        filterText.setPlaceholder("Filter by brand or generic name (e.g. Dolo, Cetirizine)...");
        filterText.setValueChangeMode(ValueChangeMode.LAZY);
        filterText.addValueChangeListener(e -> updateList());

        add(filterText);

        grid.setColumns("brandName", "genericName", "manufacturer", "strength", "dosage", "prescription", "source");
        grid.setWidthFull();

        add(grid);
        updateList();
    }

    private void updateList() {
        if (filterText.getValue() == null || filterText.getValue().isEmpty()) {
            grid.setItems(repository.findAll());
        } else {
            grid.setItems(repository.findByBrandNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(
                filterText.getValue(), filterText.getValue()
            ));
        }
    }
}
