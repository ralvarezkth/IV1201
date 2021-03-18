package com.example.recruiter_client;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.loopj.android.http.*;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import cz.msebera.android.httpclient.Header;

public class LoginActivity extends AppCompatActivity {
    FeedbackProdiver fProvider;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        AsyncHttpClient client = new AsyncHttpClient();
        Button button = (Button)findViewById(R.id.button);
        TextView text = (TextView)findViewById(R.id.textView);
        TextView textName = (TextView)findViewById(R.id.editTextTextPersonName);
        TextView textPassword = (TextView)findViewById(R.id.editTextTextPassword);
        fProvider = new FeedbackProdiver("empty", 2000, new Handler(), text);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String username = textName.getText().toString();
                String password = textPassword.getText().toString();

                if (username.length() == 0 || password.length() == 0) {
                    fProvider.set("empty");
                    Thread t1 = new Thread(fProvider);
                    t1.start();
                    return;
                }

                client.get(getUrl("login?username=" + username + "&password=" + password), new JsonHttpResponseHandler() {
                    @Override
                    public void onStart() {

                    }

                    @Override
                    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                        Intent intent = new Intent(LoginActivity.this, AdminActivity.class);
                        switchView(intent, response);
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, String err, Throwable error) {

                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, Throwable error, JSONObject response) {
                        fProvider.set("wrong");
                        Thread t1 = new Thread(fProvider);
                        t1.start();
                    }
                });
            }
        });


    }

    private class FeedbackProdiver implements Runnable {
        private String feedback;
        private int delay;
        private Map<String, String[]> map = new HashMap<>();
        private Handler handler;
        private TextView feedbackView;
        private int running = 0;

        FeedbackProdiver(String feedback, int delay, Handler handler, TextView feedbackView) {
            this.feedback = feedback;
            this.delay = delay;
            this.handler = handler;
            this.feedbackView = feedbackView;
            init();
        }

        FeedbackProdiver(String feedback, int delay, Handler handler, TextView feedbackView, String key, String[] sequence) {
            this.feedback = feedback;
            this.delay = delay;
            this.handler = handler;
            this.feedbackView = feedbackView;
            this.map.put(key, sequence);
            init();
        }

        private void init() {
            this.map.put("empty", new String[] {"Amateur Hour...", "Both fields required...", "Try again, please!", "Login"});
            this.map.put("wrong", new String[] {"Elephant fingers?", "Wrong credentials...", "Try again, please!", "Login"});
            this.map.put("app", new String[] {"Out of sausage?", "Korvgrillers fry...", "Recruiters recruit...", "Try again, please!", "Login"});
        }

        private void post(String text) {
            handler.post(new Runnable() {
                @Override
                public void run() {
                    feedbackView.setText(text);
                }
            });
        }

        void set(String feedback) {
            this.feedback = feedback;
        }

        void add(String key, String[] sequence) {
            this.map.put(key, sequence);
        }

        void delay(int delay) {
            this.delay = delay;
        }

        public void run() {
            if (!map.containsKey(feedback)) {
                throw new IllegalStateException("Set feedback does not exist");
            }

            String[] content = map.get(feedback);
            int length = content.length;
            int no = ++this.running;

            for (int i = 0; i < length && no == running; i++) {
                post(content[i]);

                try {
                    Thread.sleep(delay);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            }
        }
    }

    String getUrl(String route) {
        return "http://10.0.2.2:3001/" + route;
    }

    void switchView(Intent intent, JSONObject response) {
        String r = null;

        try {
            r = (String)response.getJSONObject("user").get("role");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        if (r.equals("r")) {
            LoginActivity.this.startActivity(intent);
        } else {
            fProvider.set("app");
            Thread t1 = new Thread(fProvider);
            t1.start();
        }
    }
}