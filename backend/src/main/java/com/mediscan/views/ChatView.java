package com.mediscan.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.io.InputStream;
import java.util.Base64;

@PageTitle("AI Pharmacist Chat | MEDISCAN AI Java")
@Route(value = "chat", layout = MainLayout.class)
public class ChatView extends VerticalLayout {

    private final VerticalLayout messageContainer = new VerticalLayout();
    private final TextField inputField = new TextField();
    private final MemoryBuffer buffer = new MemoryBuffer();
    private String uploadedImageBase64 = null;

    public ChatView() {
        setSpacing(true);
        setPadding(true);

        add(new H2("🤖 AI Clinical Assistant (Java Multimodal Chat)"));
        add(new Paragraph("Ask questions about medicine uses, benefits, side effects, or upload a photo (e.g. Dolo 650, Cetirizine, Erythromycin)."));

        messageContainer.setWidthFull();
        messageContainer.getStyle()
            .set("background", "#F8FAFC")
            .set("border-radius", "16px")
            .set("padding", "16px")
            .set("min-height", "350px")
            .set("max-height", "450px")
            .set("overflow-y", "auto");

        addMessage("MEDISCAN AI", "Hello! I am your AI Clinical Assistant. Upload a photo or ask any medication question!", false);

        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("image/jpeg", "image/png");
        upload.addSucceededListener(event -> {
            try {
                InputStream inputStream = buffer.getInputStream();
                byte[] bytes = inputStream.readAllBytes();
                uploadedImageBase64 = Base64.getEncoder().encodeToString(bytes);
                addMessage("System", "📷 Image attached: " + event.getFileName(), true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        inputField.setPlaceholder("Ask about Dolo 650, side effects, dosage...");
        inputField.setWidthFull();

        Button sendBtn = new Button("Send", e -> sendMessage());

        HorizontalLayout inputBar = new HorizontalLayout(upload, inputField, sendBtn);
        inputBar.setWidthFull();
        inputBar.setFlexGrow(1, inputField);

        add(messageContainer, inputBar);
    }

    private void sendMessage() {
        String text = inputField.getValue();
        if ((text == null || text.trim().isEmpty()) && uploadedImageBase64 == null) return;

        addMessage("You", text != null ? text : "[Photo Attached]", true);
        inputField.clear();

        // Simulate AI pharmacist logic or call Gemini
        String aiResponse = generateAIResponse(text, uploadedImageBase64);
        addMessage("MEDISCAN AI", aiResponse, false);

        uploadedImageBase64 = null;
    }

    private void addMessage(String sender, String text, boolean isUser) {
        Div msg = new Div();
        msg.getStyle()
            .set("background", isUser ? "#0EA5E9" : "#FFFFFF")
            .set("color", isUser ? "#FFFFFF" : "#000000")
            .set("padding", "12px 16px")
            .set("border-radius", "12px")
            .set("margin-bottom", "8px")
            .set("max-width", "80%")
            .set("white-space", "pre-line")
            .set("align-self", isUser ? "flex-end" : "flex-start");

        msg.setText("【" + sender + "】\n" + text);
        messageContainer.add(msg);
    }

    private String generateAIResponse(String prompt, String imageBase64) {
        String p = prompt != null ? prompt.toLowerCase() : "";
        if (p.contains("dolo") || p.contains("paracetamol")) {
            return "📋 **Dolo 650 (Paracetamol)**\n" +
                   "• **Description**: Analgesic and antipyretic medication.\n" +
                   "• **Uses & Benefits**: Reduces fever, treats body aches, headaches, and mild pain.\n" +
                   "• **Side Effects**: Rare stomach upset. Overdose can cause severe liver damage.\n" +
                   "• **Dosage**: 1 tablet after food as needed (Max 4/day).";
        } else if (p.contains("cetirizine") || p.contains("citizen")) {
            return "📋 **Cetirizine Hydrochloride**\n" +
                   "• **Description**: Antihistamine allergy relief medication.\n" +
                   "• **Uses & Benefits**: Relieves hay fever, hives, sneezing, watery eyes, and itching.\n" +
                   "• **Side Effects**: Drowsiness, fatigue, dry mouth.\n" +
                   "• **Dosage**: 10mg once daily with or without food.";
        } else if (p.contains("erythromycin") || p.contains("entromycin")) {
            return "📋 **Erythromycin**\n" +
                   "• **Description**: Macrolide antibiotic medication.\n" +
                   "• **Uses & Benefits**: Treats bacterial infections of respiratory tract and skin.\n" +
                   "• **Side Effects**: Nausea, stomach cramps, diarrhea.\n" +
                   "• **Dosage**: 250mg-500mg every 6 hours on an empty stomach.";
        }

        return "📋 **MEDISCAN AI Pharmacist Analysis**\n" +
               "• **Overview**: Always consult a physician before starting any new treatment.\n" +
               "• **Uses & Benefits**: Follow the directions on your verified prescription label.\n" +
               "• **Side Effects**: Monitor for allergic reactions or unusual discomfort.";
    }
}
