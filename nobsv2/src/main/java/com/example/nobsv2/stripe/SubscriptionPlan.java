package com.example.nobsv2.stripe;


public enum SubscriptionPlan {
    FREE("free" , 1 , 2, 10 ),
    BASIC("basic" , 5 , 20, 100),
    PRO("pro" , 20, 100, -1),
    ENTERPRISE("enterprise" , -1 , -1, -1);

    private final String planName;
    private final int monthlySearches;
    private final int monthlyWebsiteGenerations;
    private final int monthlyMessages;

    SubscriptionPlan(String planName, int monthlySearches, int monthlyWebsiteGenerations, int monthlyMessages) {
        this.planName = planName;
        this.monthlySearches = monthlySearches;
        this.monthlyWebsiteGenerations = monthlyWebsiteGenerations;
        this.monthlyMessages = monthlyMessages;
    }


    public String getPlanName() {
        return planName;
    }

    public int getMonthlySearches() {
        return monthlySearches;
    }

    public int getMonthlyWebsiteGenerations() {
        return monthlyWebsiteGenerations;
    }

    public int getMonthlyMessages() {
        return monthlyMessages;
    }

    public boolean hasUnlimitedSearches() {
        return monthlySearches == -1;
    }

    public boolean hasUnlimitedWebsites() {
        return monthlyWebsiteGenerations == -1;
    }

    public boolean hasUnlimitedMessages() {
        return monthlyMessages == -1;
    }




}
