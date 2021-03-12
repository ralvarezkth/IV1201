package com.example.recruiter_client;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CursorAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import cz.msebera.android.httpclient.Header;

public class AdminActivity extends AppCompatActivity {
    private JSONArray apps = null;
    private Map<String, String> status = new HashMap<>();
    private FeedbackProdiver fProvider = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin);

        AsyncHttpClient client = new AsyncHttpClient();
        Spinner spinnerApplication = (Spinner)findViewById(R.id.spinnerApplication);
        Spinner spinnerStatus = (Spinner)findViewById(R.id.spinnerStatus);
        Button buttonUpdate = (Button)findViewById(R.id.buttonUpdate);
        Button buttonDetails = (Button)findViewById(R.id.buttonDetails);
        TextView textAdmin = (TextView)findViewById(R.id.textAdmin);
        fProvider = new FeedbackProdiver("nothing", 2000, new Handler(), textAdmin);
        Context that = this;
        status.put("1", "Unhandled");
        status.put("2", "Accepted");
        status.put("3", "Rejected");

        client.get("http://10.0.2.2:3001/admin", new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                apps = response;
                spinnerApplication.setVisibility(View.VISIBLE);
                ArrayAdapter<CharSequence> adapter = null;
                ArrayAdapter<CharSequence> adapter1 = null;
                int length = response.length();
                String[] applications = new String[length];;
                String[] stat = new String[] {"Unhandled", "Accepted", "Rejected"};

                try {
                    System.out.println(response.get(0).getClass().getName());
                } catch (Exception e) {

                }

                for (int i = 0; i < length; i++) {
                    try {
                        applications[i] = String.valueOf((Integer)response.getJSONObject(i).get("id"));
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                }

                adapter = new ArrayAdapter<>(that, android.R.layout.simple_spinner_item, applications);
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                spinnerApplication.setAdapter(adapter);
                adapter1 = new ArrayAdapter<>(that, android.R.layout.simple_spinner_item, stat);
                adapter1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                spinnerStatus.setAdapter(adapter1);
                spinnerStatus.setVisibility(View.VISIBLE);
                buttonUpdate.setVisibility(View.VISIBLE);
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable error, JSONObject response) {
                System.out.println(response);
            }
        });

        buttonUpdate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int id = Integer.parseInt(spinnerApplication.getSelectedItem().toString());
                String statText = spinnerStatus.getSelectedItem().toString();
                String stat = getStatus(statText);
                JSONObject obj = getApplication(id);

                try {
                    if ((int)obj.get("statusId") == Integer.parseInt(stat)) {
                        fProvider.set("nothing");
                        Thread t1 = new Thread(fProvider);
                        t1.start();
                        return;
                    }

                    obj.put("statusId", Integer.parseInt(stat));
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }

                RequestParams req = new RequestParams();
                req.put("updatedApplication", obj);

                client.put("http://10.0.2.2:3001/admin/" + id, req, new JsonHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                        setApplication(id, response);

                        try {
                            fProvider.add("success", new String[] {"Success!", "Application id " + id + " set \"" + statText + "\"",
                            "Administer application"});
                            fProvider.set("success");
                            Thread t1 = new Thread(fProvider);
                            t1.start();
                        } catch (Exception e) {
                            System.out.println(e.getMessage());
                        }
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, Throwable error, JSONObject response) {
                        if (statusCode == 403) {
                            fProvider.set("sleep");
                            Thread t1 = new Thread(fProvider);
                            t1.start();

                            client.get("http://10.0.2.2:3001/admin", new JsonHttpResponseHandler() {
                                @Override
                                public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                                    apps = response;
                                }
                            });
                        }

                        if (statusCode == 500) {
                            fProvider.set("tech");
                            Thread t1 = new Thread(fProvider);
                            t1.start();
                        }
                    }
                });
            }
        });

        buttonDetails.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int id = Integer.parseInt(spinnerApplication.getSelectedItem().toString());

                client.get("http://10.0.2.2:3001/admin/" + id, new JsonHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                        System.out.println(response);

                        try {
                            fProvider.add("details", new String[] {"Success!", "Application id " + id + " fetched!",
                                    "Administer application"});
                            fProvider.set("details");
                            Thread t1 = new Thread(fProvider);
                            t1.start();
                        } catch (Exception e) {
                            System.out.println(e.getMessage());
                        }
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, String str, Throwable error) {

                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, Throwable error, JSONObject response) {
                        if (statusCode == 403) {
                            fProvider.set("sleep");
                            Thread t1 = new Thread(fProvider);
                            t1.start();

                            client.get("http://10.0.2.2:3001/admin", new JsonHttpResponseHandler() {
                                @Override
                                public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                                    apps = response;
                                }
                            });
                        }

                        if (statusCode == 404) {
                            // lalala
                        }

                        if (statusCode == 500) {
                            fProvider.set("tech");
                            Thread t1 = new Thread(fProvider);
                            t1.start();
                        }
                    }
                });
            }
        });
    }

    JSONObject getApplication(int id) {
        for (int i = 0; i < apps.length(); i++) {
            try {
                JSONObject app = apps.getJSONObject(i);
                if ((int)app.get("id") == id) {
                    return new JSONObject(app.toString());
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }

        return null;
    }

    void setApplication(int id, JSONObject obj) {
        for (int i = 0; i < apps.length(); i++) {
            try {
                JSONObject app = apps.getJSONObject(i);
                if ((int)app.get("id") == id) {
                    apps.put(i, obj);
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    String getStatus(String stat) {
        for (String key : status.keySet()) {
            if (status.get(key).equals(stat)) {
                return key;
            }
        }

        return null;
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
            this.map.put("nothing", new String[] {"No can do...", "Nothing to update...", "Back to the beach...", "Try again, please!", "Administer application"});
            this.map.put("sleep", new String[] {"Version mismatch...", "Commonly result of napping on the job...", "Try coffein, and try again, please!", "Administer application"});
            this.map.put("tech", new String[] {"Technical issues...", "Try again, please!", "Administer application"});
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
}