package com.mediscan.seeder;

import com.mediscan.model.Medicine;
import com.mediscan.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public void run(String... args) throws Exception {
        if (medicineRepository.count() < 10) {
            System.out.println("🌱 Seeding 1000+ medicines into MongoDB from Java...");
            medicineRepository.deleteAll();

            List<Medicine> seeds = new ArrayList<>();

            // 1. Dolo 650
            Medicine dolo = new Medicine();
            dolo.setBrandName("Dolo 650");
            dolo.setGenericName("Paracetamol");
            dolo.setManufacturer("Micro Labs Ltd");
            dolo.setStrength("650mg");
            dolo.setDosage("1 Tablet every 6 hours");
            dolo.setUses(Arrays.asList("Fever", "Mild to Moderate Pain", "Headache", "Body ache"));
            dolo.setSideEffects(new Medicine.SideEffects(
                Arrays.asList("Nausea", "Stomach pain", "Loss of appetite"),
                Arrays.asList("Liver damage (in overdose)", "Allergic reaction")
            ));
            dolo.setWarnings(Arrays.asList("Do not exceed 4000mg per day", "Avoid alcohol"));
            dolo.setPregnancy("Generally considered safe if used as directed");
            dolo.setBreastfeeding("Safe to use");
            dolo.setAlcohol("Avoid alcohol to prevent liver damage");
            dolo.setDriving("Safe");
            dolo.setKidney("Use with caution");
            dolo.setLiver("Strict caution required");
            dolo.setStorage("Store below 30°C in a dry place");
            dolo.setHowToTake("Swallow whole with a glass of water.");
            dolo.setBeforeAfterFood("After Food");
            dolo.setWhoShouldAvoid("People with severe liver disease");
            dolo.setTabletColor("White");
            dolo.setTabletShape("Oval");
            dolo.setPrescription("No (OTC)");
            dolo.setSource("Java Seed");
            seeds.add(dolo);

            // 2. Cetirizine
            Medicine cetirizine = new Medicine();
            cetirizine.setBrandName("Cetirizine");
            cetirizine.setGenericName("Cetirizine Hydrochloride");
            cetirizine.setManufacturer("Generic Healthcare");
            cetirizine.setStrength("10mg");
            cetirizine.setDosage("1 Tablet daily");
            cetirizine.setUses(Arrays.asList("Allergies", "Hay fever", "Hives", "Watery eyes"));
            cetirizine.setSideEffects(new Medicine.SideEffects(
                Arrays.asList("Sleepiness", "Dry mouth", "Fatigue"),
                Arrays.asList("Difficulty breathing (rare allergic reaction)")
            ));
            cetirizine.setWarnings(Arrays.asList("May cause drowsiness"));
            cetirizine.setPregnancy("Consult doctor");
            cetirizine.setBreastfeeding("Consult doctor");
            cetirizine.setAlcohol("Avoid alcohol");
            cetirizine.setDriving("Avoid driving if sleepy");
            cetirizine.setKidney("Dose adjustment needed");
            cetirizine.setLiver("Use with caution");
            cetirizine.setStorage("Store at room temperature");
            cetirizine.setHowToTake("Swallow whole with water.");
            cetirizine.setBeforeAfterFood("With or without food");
            cetirizine.setWhoShouldAvoid("People with severe kidney impairment");
            cetirizine.setTabletColor("White");
            cetirizine.setTabletShape("Round");
            cetirizine.setPrescription("No (OTC)");
            cetirizine.setSource("Java Seed");
            seeds.add(cetirizine);

            // 3. Erythromycin
            Medicine erythromycin = new Medicine();
            erythromycin.setBrandName("Erythromycin");
            erythromycin.setGenericName("Erythromycin");
            erythromycin.setManufacturer("PharmaCorp");
            erythromycin.setStrength("250mg");
            erythromycin.setDosage("1 Tablet every 6 hours");
            erythromycin.setUses(Arrays.asList("Bacterial Infections", "Respiratory tract infections", "Skin infections"));
            erythromycin.setSideEffects(new Medicine.SideEffects(
                Arrays.asList("Nausea", "Vomiting", "Diarrhea", "Stomach cramps"),
                Arrays.asList("Liver problems", "Irregular heartbeat")
            ));
            erythromycin.setWarnings(Arrays.asList("Complete full course"));
            erythromycin.setPregnancy("Consult doctor");
            erythromycin.setBreastfeeding("Consult doctor");
            erythromycin.setAlcohol("Avoid alcohol");
            erythromycin.setDriving("Safe");
            erythromycin.setKidney("Safe");
            erythromycin.setLiver("Use with caution");
            erythromycin.setStorage("Store at room temperature");
            erythromycin.setHowToTake("Swallow whole with a full glass of water.");
            erythromycin.setBeforeAfterFood("Empty stomach");
            erythromycin.setWhoShouldAvoid("Allergic to macrolides");
            erythromycin.setTabletColor("Pink");
            erythromycin.setTabletShape("Oval");
            erythromycin.setPrescription("Yes");
            erythromycin.setSource("Java Seed");
            seeds.add(erythromycin);

            // Loop to generate 1000+ total database entries dynamically for demo scaling
            for (int i = 4; i <= 1000; i++) {
                Medicine m = new Medicine();
                m.setBrandName("MediPharma-" + i);
                m.setGenericName("Generic Compound " + (i % 100));
                m.setManufacturer("Global Pharma Corp");
                m.setStrength((10 * (i % 50)) + "mg");
                m.setDosage("1 Tablet twice daily");
                m.setUses(Arrays.asList("General therapeutic treatment", "Inflammation management"));
                m.setSideEffects(new Medicine.SideEffects(
                    Arrays.asList("Mild nausea", "Headache"),
                    Arrays.asList("Allergic rash")
                ));
                m.setWarnings(Arrays.asList("Take under doctor supervision"));
                m.setSource("Generated Java Mongo Dataset");
                seeds.add(m);
            }

            medicineRepository.saveAll(seeds);
            System.out.println("✅ Successfully seeded 1000+ medicines into MongoDB via Java Spring Boot!");
        }
    }
}
