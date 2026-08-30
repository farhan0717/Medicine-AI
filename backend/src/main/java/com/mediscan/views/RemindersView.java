package com.mediscan.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.component.html.NativeButton;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.time.LocalTime;

@PageTitle("Alarms & Reminders | MEDISCAN AI Java")
@Route(value = "reminders", layout = MainLayout.class)
public class RemindersView extends VerticalLayout {

    public RemindersView() {
        setSpacing(true);
        setPadding(true);

        add(new H2("⏰ Medicine Alarm & Reminder Scheduler"));
        add(new Paragraph("Set your daily medicine alarms. When the alarm triggers, it will ring loudly."));

        TextField medName = new TextField("Medicine Name");
        medName.setValue("Dolo 650");

        TimePicker timePicker = new TimePicker("Alarm Time");
        timePicker.setValue(LocalTime.now());

        Button setAlarmBtn = new Button("Set Alarm", e -> {
            triggerAlarmDialog(medName.getValue());
        });

        Button testRingBtn = new Button("🔔 Test Ringing Alarm Sound", e -> {
            triggerAlarmDialog("Test Ring: " + medName.getValue());
        });

        add(new HorizontalLayout(medName, timePicker), new HorizontalLayout(setAlarmBtn, testRingBtn));
    }

    private void triggerAlarmDialog(String medicineName) {
        Dialog alarmDialog = new Dialog();
        alarmDialog.setHeaderTitle("⏰ ALARM RINGING: Take " + medicineName);

        VerticalLayout content = new VerticalLayout();
        content.add(new Paragraph("It is time to take your dose of " + medicineName + "."));

        // Execute JS audio ringing natively from Java
        UI.getCurrent().getPage().executeJs(
            "let audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');" +
            "audio.loop = true;" +
            "audio.play();" +
            "window.currentAlarmAudio = audio;"
        );

        Button stopBtn = new Button("Stop Alarm & Take Dose", e -> {
            UI.getCurrent().getPage().executeJs("if(window.currentAlarmAudio) { window.currentAlarmAudio.pause(); }");
            alarmDialog.close();
        });

        alarmDialog.add(content);
        alarmDialog.getFooter().add(stopBtn);
        alarmDialog.open();
    }
}
