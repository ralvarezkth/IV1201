package com.example.recruiter_client;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.LinkedList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        UISequentialHandler uiHandler = new UISequentialHandler(new Handler());
        UITextView textMain = new UITextView(R.id.textSplashMain);
        UITextView textTitleOne = new UITextView(R.id.textSplashTitleOne);
        UITextView textTitleTwo = new UITextView(R.id.textSplashTitleTwo);
        UITextView textTitleThree = new UITextView(R.id.textSplashTitleThree);
        UIImageView imageMain = new UIImageView(R.id.imageSplash, false);
        imageMain.setImages(new Integer[] {R.drawable.korv_111, R.drawable.korv_222, R.drawable.korv_333,
            R.drawable.karusell_111, R.drawable.karusell_222, R.drawable.karusell_333, R.drawable.confused_111});

        textMain.addEvent(new String[] {"1000", "set", "BECOME"});
        textMain.addEvent(new String[] {"2000", "set", "BECOME."});
        textMain.addEvent(new String[] {"2500", "set", "BECOME.."});
        textMain.addEvent(new String[] {"3000", "set", "BECOME..."});
        textMain.addEvent(new String[] {"4000", "toggle"});
        imageMain.addEvent(new String[] {"4000", "toggle"});
        textTitleOne.addEvent(new String[] {"5000", "set", "A"});
        textTitleTwo.addEvent(new String[] {"7000", "set", "PROFESSIONAL"});
        textTitleThree.addEvent(new String[] {"9000", "set", "Korv"});
        textTitleThree.addEvent(new String[] {"11000", "set", "KorvServant"});
        imageMain.addEvent(new String[] {"12000", "set", "2"});
        imageMain.addEvent(new String[] {"13000", "set", "3"});
        imageMain.addEvent(new String[] {"15000", "toggle"});
        textMain.addEvent(new String[] {"15000", "toggle"});
        textTitleOne.addEvent(new String[] {"15000", "toggle"});
        textTitleTwo.addEvent(new String[] {"15000", "toggle"});
        textTitleThree.addEvent(new String[] {"15000", "toggle"});
        textTitleOne.addEvent(new String[] {"15000", "set", ""});
        textTitleTwo.addEvent(new String[] {"15000", "set", ""});
        textTitleThree.addEvent(new String[] {"15000", "set", ""});
        textMain.addEvent(new String[] {"15000", "set", "or"});
        textMain.addEvent(new String[] {"15500", "set", ".or."});
        textMain.addEvent(new String[] {"16000", "set", "..or.."});
        textMain.addEvent(new String[] {"16500", "set", "...or..."});
        textMain.addEvent(new String[] {"17000", "toggle"});
        imageMain.addEvent(new String[] {"17000", "set", "4"});
        imageMain.addEvent(new String[] {"17000", "toggle"});
        textTitleOne.addEvent(new String[] {"18000", "toggle"});
        textTitleTwo.addEvent(new String[] {"18000", "toggle"});
        textTitleThree.addEvent(new String[] {"18000", "toggle"});
        textTitleOne.addEvent(new String[] {"18000", "set", "The"});
        textTitleTwo.addEvent(new String[] {"20000", "set", "ULTIMATE"});
        textTitleThree.addEvent(new String[] {"22000", "set", "Karusell"});
        textTitleThree.addEvent(new String[] {"24000", "set", "KarusellChaffeur"});
        imageMain.addEvent(new String[] {"25000", "set", "5"});
        imageMain.addEvent(new String[] {"27000", "set", "6"});
        imageMain.addEvent(new String[] {"29000", "toggle"});
        textTitleOne.addEvent(new String[] {"29000", "toggle"});
        textTitleTwo.addEvent(new String[] {"29000", "toggle"});
        textTitleThree.addEvent(new String[] {"29000", "toggle"});
        textMain.addEvent(new String[] {"29000", "toggle"});
        textMain.addEvent(new String[] {"29000", "set", "Apply"});
        textMain.addEvent(new String[] {"29500", "set", "Apply Today"});
        textMain.addEvent(new String[] {"30000", "set", "Apply Today!"});
        textMain.addEvent(new String[] {"30500", "set", "Apply"});
        textMain.addEvent(new String[] {"31000", "set", "Apply Tomorrow"});
        textMain.addEvent(new String[] {"31500", "set", "Apply Tomorrow!"});
        textMain.addEvent(new String[] {"32000", "set", "Apply"});
        textMain.addEvent(new String[] {"32500", "set", "Apply Every"});
        textMain.addEvent(new String[] {"33000", "set", "Apply Every Day"});
        textMain.addEvent(new String[] {"33500", "set", "Apply Every Day!"});
        textMain.addEvent(new String[] {"33750", "set", ""});
        textMain.addEvent(new String[] {"34000", "set", "Apply Every Day!"});
        textMain.addEvent(new String[] {"34250", "set", ""});
        textMain.addEvent(new String[] {"34500", "set", "Apply Every Day!"});
        textMain.addEvent(new String[] {"35000", "set", "Starting tomorrow"});
        textMain.addEvent(new String[] {"36000", "set", "and"});
        textMain.addEvent(new String[] {"36500", "set", ".and."});
        textMain.addEvent(new String[] {"37000", "set", "..and.."});
        textMain.addEvent(new String[] {"37500", "set", "...and..."});
        textMain.addEvent(new String[] {"38000", "set", "ending today!"});
        imageMain.addEvent(new String[] {"38500", "set", "7"});
        imageMain.addEvent(new String[] {"38500", "toggle"});

        uiHandler.add(textMain);
        uiHandler.add(textTitleOne);
        uiHandler.add(textTitleTwo);
        uiHandler.add(textTitleThree);
        uiHandler.add(imageMain);

        Thread t1 = new Thread(uiHandler);
        t1.start();
    }

    private class UISequentialHandler implements Runnable {
        Handler handler = null;
        boolean running = false;
        List<UIComponent> eventsComponent = null;
        List<List<String>> events = null;

        UISequentialHandler(Handler handler) {
            this.handler = handler;
            eventsComponent = new LinkedList<UIComponent>();
            events = new LinkedList<List<String>>();

        }

        public void run() {
            running = true;
            int waited = 0, i = 0;

            do {
                int delay = Integer.parseInt(events.get(i).get(0));
                int prev = delay;
                int adjustedDelay = delay - waited;

                try {
                    Thread.sleep(adjustedDelay);
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                }

                while (i < events.size()) {
                    prev = delay;
                    delay = Integer.parseInt(events.get(i).get(0));

                    if (delay != prev) {
                        break;
                    }

                    handleEvent(eventsComponent.get(i), events.get(i));
                    i++;
                }

                waited += adjustedDelay;
            } while (i < eventsComponent.size());

            try {
                Thread.sleep(1500);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }

            handler.post(new Runnable() {
                @Override
                public void run() {
                    Intent intent = new Intent(MainActivity.this, LoginActivity.class);
                    MainActivity.this.startActivity(intent);
                }
            });
        }

        void add(UIComponent component) {
            List<List<String>> evs = component.getEvents();

            if (running) {
                System.err.println("Cannot add new events after execution.");
                return;
            }

            for (int i = 0; i < evs.size(); i++) {
                boolean flag = true;

                for (int j = 0; j < eventsComponent.size(); j++) {
                    int eventDelay = Integer.parseInt(events.get(j).get(0));
                    int newEventDelay = Integer.parseInt(evs.get(i).get(0));

                    if (newEventDelay <= eventDelay) {
                        eventsComponent.add(j, component);
                        events.add(j, evs.get(i));
                        component.setHandler(handler);
                        flag = false;
                        break;
                    }

                }

                if (flag) {
                    eventsComponent.add(component);
                    events.add(evs.get(i));
                    component.setHandler(handler);
                }
            }
        }

        private void handleEvent(UIComponent component, List<String> event) {
            String delay = event.get(0);
            String type = event.get(1).toLowerCase();
            String content = event.size() > 2 ? event.get(2) : null;

            switch (type) {
                case "set":
                    component.set(content);
                    break;
                case "toggle":
                    component.toggle();
                    break;
                default:
                    break;
            }
        }
    }

    private class UITextView implements UIComponent {
        int id;
        boolean visible = true;
        TextView textView = null;
        List<List<String>> events = null;
        Handler handler = null;

        UITextView(int id) {
            this.id = id;
            this.textView = (TextView)findViewById(id);
            events = new LinkedList<List<String>>();
        }

        UITextView(int id, boolean visibility) {
            this.id = id;
            this.visible = visibility;
            this.textView = (TextView) findViewById(id);
            textView.setVisibility(View.INVISIBLE);
            events = new LinkedList<List<String>>();
        }

        public void setHandler(Handler handler) {
            this.handler = handler;
        }

        public List<List<String>> getEvents() {
            return events;
        }

        public void addEvent(List<String> event) {
            this.events.add(event);
        }

        public void addEvent(String[] event) {
            List<String> ev = new LinkedList<String>();

            for (int i = 0; i < event.length; i++) {
                ev.add(event[i]);
            }

            this.events.add(ev);
        }

        public void setVisibility(boolean visibility) {
            this.visible = visibility;
            textView.setVisibility(visibility ? View.VISIBLE : View.INVISIBLE);;
        }

        public void set(String content) {
            handler.post(new Runnable() {
                @Override
                public void run() {
                    textView.setText(content);
                }
            });
        }

        public void toggle() {
            int visibility = visible ? View.INVISIBLE : View.VISIBLE;
            this.visible = visibility == View.INVISIBLE ? false : true;

            handler.post(new Runnable() {
                public void run() {
                    textView.setVisibility(visibility);
                }
            });
        }
    }

    private class UIImageView implements UIComponent {
        int id;
        boolean visible = true;
        ImageView imageView = null;
        List<List<String>> events = null;
        List<Integer> imageIds = null;
        Handler handler = null;

        UIImageView(int id) {
            this.id = id;
            this.imageView = (ImageView) findViewById(id);
            this.events = new LinkedList<List<String>>();
            this.imageIds = new LinkedList<Integer>();
        }

        UIImageView(int id, boolean visibility) {
            this.id = id;
            this.visible = visibility;
            this.imageView = (ImageView) findViewById(id);
            imageView.setVisibility(View.INVISIBLE);
            this.events = new LinkedList<List<String>>();
            this.imageIds = new LinkedList<Integer>();
        }

        public void setHandler(Handler handler) {
            this.handler = handler;
        }

        public void setImages(Integer[] images) {
            for (int i = 0; i < images.length; i++) {
                this.imageIds.add(images[i]);
            }
        }

        public List<List<String>> getEvents() {
            return events;
        }

        public void addEvent(List<String> event) {
            this.events.add(event);
        }

        public void addEvent(String[] event) {
            List<String> ev = new LinkedList<String>();

            for (int i = 0; i < event.length; i++) {
                ev.add(event[i]);
            }

            this.events.add(ev);
        }

        public void setVisibility(boolean visibility) {
            this.visible = visibility;
            imageView.setVisibility(visibility ? View.VISIBLE : View.INVISIBLE);;
        }

        public void set(String id) {
            handler.post(new Runnable() {
                @Override
                public void run() {
                    imageView.setImageResource(imageIds.get(Integer.parseInt(id) - 1));
                }
            });
        }

        public void toggle() {
            int visibility = visible ? View.INVISIBLE : View.VISIBLE;
            this.visible = visibility == View.INVISIBLE ? false : true;

            handler.post(new Runnable() {
                public void run() {
                    imageView.setVisibility(visibility);
                }
            });
        }
    }

    private interface UIComponent {
        void setHandler(Handler handler);
        List<List<String>> getEvents();
        void set(String content);
        void toggle();
    }
}