import { Component, OnInit } from "@angular/core";
import { Configs, defaultConfigs } from "../configs.model";

const CONFIGS_KEY = "whos-who-configs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    this.saveDefaultConfigsIfNotExists();
  }

  saveDefaultConfigsIfNotExists(): void {
    const configsFromStorage = localStorage.getItem(CONFIGS_KEY);
    if (!configsFromStorage) {
      localStorage.setItem(CONFIGS_KEY, JSON.stringify(defaultConfigs));
    }
  }
}

