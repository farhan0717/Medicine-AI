package com.mediscan.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "medicines")
public class Medicine {
    @Id
    private String id;
    private String brandName;
    private String genericName;
    private String manufacturer;
    private String strength;
    private String dosage;
    private List<String> uses;
    private SideEffects sideEffects;
    private List<String> warnings;
    private String pregnancy;
    private String breastfeeding;
    private String alcohol;
    private String driving;
    private String kidney;
    private String liver;
    private String storage;
    private String howToTake;
    private String beforeAfterFood;
    private String whoShouldAvoid;
    private String tabletColor;
    private String tabletShape;
    private String prescription;
    private String source;

    public static class SideEffects {
        private List<String> common;
        private List<String> serious;

        public SideEffects() {}

        public SideEffects(List<String> common, List<String> serious) {
            this.common = common;
            this.serious = serious;
        }

        public List<String> getCommon() { return common; }
        public void setCommon(List<String> common) { this.common = common; }
        public List<String> getSerious() { return serious; }
        public void setSerious(List<String> serious) { this.serious = serious; }
    }

    public Medicine() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBrandName() { return brandName; }
    public void setBrandName(String brandName) { this.brandName = brandName; }
    public String getGenericName() { return genericName; }
    public void setGenericName(String genericName) { this.genericName = genericName; }
    public String getManufacturer() { return manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }
    public String getStrength() { return strength; }
    public void setStrength(String strength) { this.strength = strength; }
    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }
    public List<String> getUses() { return uses; }
    public void setUses(List<String> uses) { this.uses = uses; }
    public SideEffects getSideEffects() { return sideEffects; }
    public void setSideEffects(SideEffects sideEffects) { this.sideEffects = sideEffects; }
    public List<String> getWarnings() { return warnings; }
    public void setWarnings(List<String> warnings) { this.warnings = warnings; }
    public String getPregnancy() { return pregnancy; }
    public void setPregnancy(String pregnancy) { this.pregnancy = pregnancy; }
    public String getBreastfeeding() { return breastfeeding; }
    public void setBreastfeeding(String breastfeeding) { this.breastfeeding = breastfeeding; }
    public String getAlcohol() { return alcohol; }
    public void setAlcohol(String alcohol) { this.alcohol = alcohol; }
    public String getDriving() { return driving; }
    public void setDriving(String driving) { this.driving = driving; }
    public String getKidney() { return kidney; }
    public void setKidney(String kidney) { this.kidney = kidney; }
    public String getLiver() { return liver; }
    public void setLiver(String liver) { this.liver = liver; }
    public String getStorage() { return storage; }
    public void setStorage(String storage) { this.storage = storage; }
    public String getHowToTake() { return howToTake; }
    public void setHowToTake(String howToTake) { this.howToTake = howToTake; }
    public String getBeforeAfterFood() { return beforeAfterFood; }
    public void setBeforeAfterFood(String beforeAfterFood) { this.beforeAfterFood = beforeAfterFood; }
    public String getWhoShouldAvoid() { return whoShouldAvoid; }
    public void setWhoShouldAvoid(String whoShouldAvoid) { this.whoShouldAvoid = whoShouldAvoid; }
    public String getTabletColor() { return tabletColor; }
    public void setTabletColor(String tabletColor) { this.tabletColor = tabletColor; }
    public String getTabletShape() { return tabletShape; }
    public void setTabletShape(String tabletShape) { this.tabletShape = tabletShape; }
    public String getPrescription() { return prescription; }
    public void setPrescription(String prescription) { this.prescription = prescription; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}
