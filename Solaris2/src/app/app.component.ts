import { Component, OnInit } from '@angular/core';
import { SolarisService } from './solaris.service';
import { stringify } from "querystring";
import { Creatures } from './models/creatures';
import { Chart } from 'D:/Codes/Angular/Solaris2/node_modules/chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  radarChartType: string = 'radar';

  
  aliveRadarChart: boolean = false;
  deadRadarChart: boolean = false;
  unknownRadarChart: boolean = false;
  unknownCarnivore: number;
  unknownHerbivore: number;
  deadCarnivore: any;
  deadHerbivore: any;
  aliveCarnivore: number;
  aliveHerbivore: number;
  selectedDay: string;
  showAgeDiet: boolean = true;
  showAliveBtn: boolean = true;
  showDeadBtn: boolean = true;
  showUnknownBtn: boolean = true;
  showingCreatures = [];
  unknownElderDietsCountHerbivore = 0;
  unknownElderDietsCountCarnivore = 0;
  unknownAdultDietsCountHerbivore = 0;
  unknownAdultDietsCountCarnivore = 0;
  unknownYoungDietsCountHerbivore = 0;
  unknownYoungDietsCountCarnivore = 0;
  deadElderDietsCountHerbivore = 0;
  deadElderDietsCountCarnivore = 0;
  deadAdultDietsCountHerbivore = 0;
  deadAdultDietsCountCarnivore = 0;
  deadYoungDietsCountHerbivore = 0;
  deadYoungDietsCountCarnivore = 0;
  aliveElderDietsCountHerbivore = 0;
  aliveElderDietsCountCarnivore = 0;
  aliveAdultDietsCountHerbivore = 0;
  aliveAdultDietsCountCarnivore = 0;
  aliveYoungDietsCountHerbivore = 0;
  aliveYoungDietsCountCarnivore = 0;
  arrayWithDate = [];
  status: string;
  datas = [];
  allArray = [];
  creatures = [];
  times = [];
  aliveCount = 0;
  deadCount = 0;
  unknownCount = 0;
  aliveTaxonomy = [];
  deadTaxonomy = [];
  unknownTaxonomy = [];
  aliveYoungCount = 0;
  deadYoungCount = 0;
  unknownYoungCount = 0;
  aliveElderCount = 0;
  deadElderCount = 0;
  unknownElderCount = 0;
  aliveAdultCount = 0;
  deadAdultCount = 0;
  unknownAdultCount = 0;
  aliveId = [];
  deadId = [];
  unknownId = [];
  young;
  adult;
  elder;
  herbivore;
  carnivore;
  elderHerbivore;
  adultHerbivore;
  youngHerbivore;
  youngCarnivore;
  elderCarnivore;
  adultCarnivore;
  deadYoung;
  deadYoungCarnivore;
  deadYoungHerbivore;
  unknownElder;
  unknownElderHerbivore;
  unknownElderCarnivore;
  unknownYoung;
  unknownYoungHerbivore;
  unknownYoungCarnivore;
  deadAdult;
  deadAdultHerbivore;
  deadAdultCarnivore;
  deadElder;
  deadElderHerbivore;
  deadElderCarnivore;
  unknownAdult;
  unknownAdultHerbivore;
  unknownAdultCarnivore;

  familya = []; // taxonominin 0. elemanı
  cins = [];  // taxonominin 1. elemanı
  tur = []; // taxonominin 2. elemanı

  familyaSayisi = [];
  cinsSayisi = [];
  turSayisi = [];

  aliveFamilya = [];
  aliveCins = [];
  aliveTur = [];
  deadFamilya = [];
  deadCins = [];
  deadTur = [];
  unknownFamilya = [];
  unknownCins = [];
  unknownTur = [];

  aliveFamilyaSayisi = [];
  aliveCinsSayisi = [];
  aliveTurSayisi = [];

  deadFamilyaSayisi = [];
  deadCinsSayisi = [];
  deadTurSayisi = [];

  unknownFamilyaSayisi = [];
  unknownCinsSayisi = [];
  unknownTurSayisi = [];

  showListVar: boolean = false;

  // pie chart 
  pieChartLabels: string[] = ["Alive", "Dead", "Unkown"];
  pieChartData: number[] = [429, 450, 27];
  pieChartType: string = 'pie';
  pieChartDataToday: number[] = [0, 0, 0];
  //pie chart bitis
  constructor(private _serviceJSON: SolarisService) { }

  ngOnInit() {

    this._serviceJSON.getJSON().subscribe(res => {
      this.datas = res;
      this.datas.forEach(data => {
        this.allArray.push(data);
        this.times.push(data[0]);
        this.creatures = data[1];
      })
      this.allArray.forEach(array => {
        this.arrayWithDate.push(array);
      })
      this.creatures.forEach(creature => {
        /**
         * Burada familya, cins ve tür'lerimizi aldık
         */
        if (!this.familya.includes(creature.taxonomy[0])) {
          this.familya.push(creature.taxonomy[0]);
        }
        if (!this.cins.includes(creature.taxonomy[1])) {
          this.cins.push(creature.taxonomy[1]);
        }
        if (!this.tur.includes(creature.taxonomy[2])) {
          this.tur.push(creature.taxonomy[2]);
        }
        if (creature.status == "alive") {
          if (!this.aliveFamilya.includes(creature.taxonomy[0])) {
            this.aliveFamilya.push(creature.taxonomy[0]);
          }
          if (!this.aliveCins.includes(creature.taxonomy[1])) {
            this.aliveCins.push(creature.taxonomy[1]);
          }
          if (!this.aliveTur.includes(creature.taxonomy[2])) {
            this.aliveTur.push(creature.taxonomy[2]);
          }
          this.aliveId.push(creature.id);
          this.aliveCount++;
          if (creature.age == "young") {
            this.aliveYoungCount++;
            if (creature.diet == "carnivore") {
              this.aliveYoungDietsCountCarnivore++;
            } else {
              this.aliveYoungDietsCountHerbivore++;
            }
          }
          if (creature.age == "adult") {

            this.aliveAdultCount++;
            if (creature.diet == "carnivore") {
              this.aliveAdultDietsCountCarnivore++;
            } else {
              this.aliveAdultDietsCountHerbivore++;
            }
          }
          if (creature.age == "elder") {
            this.aliveElderCount++;
            if (creature.diet == "carnivore") {
              this.aliveElderDietsCountCarnivore++;
            } else {
              this.aliveElderDietsCountHerbivore++;
            }
          }
          creature.taxonomy.forEach(taxonomy => {
            if (this.aliveTaxonomy.includes(taxonomy)) {
              return;
            } else {
              this.aliveTaxonomy.push(taxonomy);
             
              //console.log(this.radarChartLabelsAlive, "Alive");
            }
          })
        }
        if (creature.status == "dead") {
          if (!this.deadFamilya.includes(creature.taxonomy[0])) {
            this.deadFamilya.push(creature.taxonomy[0]);
          }
          if (!this.deadCins.includes(creature.taxonomy[1])) {
            this.deadCins.push(creature.taxonomy[1]);
          }
          if (!this.deadTur.includes(creature.taxonomy[2])) {
            this.deadTur.push(creature.taxonomy[2]);
          }
          this.deadId.push(creature.id);
          this.deadCount++;
          if (creature.age == "young") {
            this.deadYoungCount++;
            if (creature.diet == "carnivore") {
              this.deadYoungDietsCountCarnivore++;
            } else {
              this.deadYoungDietsCountHerbivore++;
            }
          }
          if (creature.age == "adult") {
            this.deadAdultCount++;
            if (creature.diet == "carnivore") {
              this.deadAdultDietsCountCarnivore++;
            } else {
              this.deadAdultDietsCountHerbivore++;
            }
          }
          if (creature.age == "elder") {
            this.deadElderCount++;
            if (creature.diet == "carnivore") {
              this.deadElderDietsCountCarnivore++;
            } else {
              this.deadElderDietsCountHerbivore++;
            }
          }
          creature.taxonomy.forEach(taxonomy => {
            if (this.deadTaxonomy.includes(taxonomy)) {
              return;
            } else {
              this.deadTaxonomy.push(taxonomy);
              
              //console.log(this.radarChartLabelsDead, "dead");
            }
          })
        }
        if (creature.status == "unknown") {
          if (!this.unknownFamilya.includes(creature.taxonomy[0])) {
            console.log("sadasdasd", creature.taxonomy[0]);
            this.unknownFamilya.push(creature.taxonomy[0]);
          }
          if (!this.unknownCins.includes(creature.taxonomy[1])) {
            this.unknownCins.push(creature.taxonomy[1]);
          }
          if (!this.unknownTur.includes(creature.taxonomy[2])) {
            this.unknownTur.push(creature.taxonomy[2]);
          }
          this.unknownId.push(creature.id);
          this.unknownCount++;
          if (creature.age == "young") {
            this.unknownYoungCount++;
            if (creature.diet == "carnivore") {
              this.unknownYoungDietsCountCarnivore++;
            } else {
              this.unknownYoungDietsCountHerbivore++;
            }
          }
          if (creature.age == "adult") {
            this.unknownAdultCount++;
            if (creature.diet == "carnivore") {
              this.unknownAdultDietsCountCarnivore++;
            } else {
              this.unknownAdultDietsCountHerbivore++;
            }
          }
          if (creature.age == "elder") {
            this.unknownElderCount++;
            if (creature.diet == "carnivore") {
              this.unknownElderDietsCountCarnivore++;
            } else {
              this.unknownElderDietsCountHerbivore++;
            }
          }

          creature.taxonomy.forEach(taxonomy => {
            if (this.unknownTaxonomy.includes(taxonomy)) {
              return;
            } else {
              this.unknownTaxonomy.push(taxonomy);
              
            }
          })

        }
      })
      console.log(this.familya, "=", this.familya.length);
      console.log(this.cins, "=", this.cins.length);
      console.log(this.tur, "=", this.tur.length);
      /**
       * Burada dizilerimizi oluşturduk.
       */
      for (let i = 0; i < this.familya.length; i++) {
        this.familyaSayisi.push(new Array);
      }
      for (let i = 0; i < this.cins.length; i++) {
        this.cinsSayisi.push(new Array);
      }
      for (let i = 0; i < this.tur.length; i++) {
        this.turSayisi.push(new Array);
      }

      /**
       * Burada Alive dizilerimizi oluşturduk.
       */
      for (let i = 0; i < this.aliveFamilya.length; i++) {
        this.aliveFamilyaSayisi.push(new Array);
      }
      for (let i = 0; i < this.aliveCins.length; i++) {
        this.aliveCinsSayisi.push(new Array);
      }
      for (let i = 0; i < this.aliveTur.length; i++) {
        this.aliveTurSayisi.push(new Array);
      }

      /**
       * Burada dead dizilerimizi oluşturduk.
       */
      for (let i = 0; i < this.deadFamilya.length; i++) {
        this.deadFamilyaSayisi.push(new Array);
      }
      for (let i = 0; i < this.deadCins.length; i++) {
        this.deadCinsSayisi.push(new Array);
      }
      for (let i = 0; i < this.deadTur.length; i++) {
        this.deadTurSayisi.push(new Array);
      }

      /**
       * Burada unknown dizilerimizi oluşturduk.
       */
      for (let i = 0; i < this.unknownFamilya.length; i++) {
        this.unknownFamilyaSayisi.push(new Array);
      }
      for (let i = 0; i < this.unknownCins.length; i++) {
        this.unknownCinsSayisi.push(new Array);
      }
      for (let i = 0; i < this.unknownTur.length; i++) {
        this.unknownTurSayisi.push(new Array);
      }
      /**
       * familya sayısını bulduk (detaylı)
       */
      for (let i = 0; i < this.familya.length; i++) {
        this.creatures.forEach(element => {
          if (this.familya[i].includes(element.taxonomy[0])) {
            this.familyaSayisi[i].push(this.familya[i]);
          }
        });
      }
      /**
       * cins sayılarını bulduk (detaylı)
       */
      for (let i = 0; i < this.cins.length; i++) {
        this.creatures.forEach(element => {
          if (this.cins[i].includes(element.taxonomy[1])) {
            this.cinsSayisi[i].push(this.cins[i]);
          }
        });
      }
      /**
       * tur sayılarını bulduk (detaylı)
       */
      for (let i = 0; i < this.tur.length; i++) {
        this.creatures.forEach(element => {
          if (this.tur[i].includes(element.taxonomy[2])) {
            this.turSayisi[i].push(this.tur[i]);
          }
        });
      }

      /**
       * Alive familya sayısını bulduk (detaylı)
       */
      for (let i = 0; i < this.aliveFamilya.length; i++) {
        this.creatures.forEach(element => {
          if (this.aliveFamilya[i].includes(element.taxonomy[0])) {
            this.aliveFamilyaSayisi[i].push(this.aliveFamilya[i]);
          }
        });
      }
      /**
       * Alive cins sayılarını bulduk (detaylı)
       */
      for (let i = 0; i < this.aliveCins.length; i++) {
        this.creatures.forEach(element => {
          if (this.aliveCins[i].includes(element.taxonomy[1])) {
            this.aliveCinsSayisi[i].push(this.aliveCins[i]);
          }
        });
      }
      /**
       * Alive tur sayılarını bulduk (detaylı)
       */
      for (let i = 0; i < this.aliveTur.length; i++) {
        this.creatures.forEach(element => {
          if (this.aliveTur[i].includes(element.taxonomy[2])) {
            this.aliveTurSayisi[i].push(this.aliveTur[i]);
          }
        });
      }

      /**
       * dead familya sayısını bulduk (detaylı)
       */
      for (let i = 0; i < this.deadFamilya.length; i++) {
        this.creatures.forEach(element => {
          if (this.deadFamilya[i].includes(element.taxonomy[0])) {
            this.deadFamilyaSayisi[i].push(this.deadFamilya[i]);
          }
        });
      }
      /**
       * dead cins sayılarını bulduk (detaylı)
       */
      for (let i = 0; i < this.deadCins.length; i++) {
        this.creatures.forEach(element => {
          if (this.deadCins[i].includes(element.taxonomy[1])) {
            this.deadCinsSayisi[i].push(this.deadCins[i]);
          }
        });
      }
      /**
       * dead tur sayılarını bulduk (detaylı)
       */
      for (let i = 0; i < this.deadTur.length; i++) {
        this.creatures.forEach(element => {
          if (this.deadTur[i].includes(element.taxonomy[2])) {
            this.deadTurSayisi[i].push(this.deadTur[i]);
          }
        });
      }

      /**
       * unknown familya sayısını bulduk (detaylı)
       */
      for (let i = 0; i < this.unknownFamilya.length; i++) {
        this.creatures.forEach(element => {
          if (this.unknownFamilya[i].includes(element.taxonomy[0])) {
            this.unknownFamilyaSayisi[i].push(this.unknownFamilya[i]);
          }
        });
      }
      /**
       * unknown cins sayılarını bulduk (detaylı)
       */
      for (let i = 0; i < this.unknownCins.length; i++) {
        this.creatures.forEach(element => {
          if (this.unknownCins[i].includes(element.taxonomy[1])) {
            this.unknownCinsSayisi[i].push(this.unknownCins[i]);
          }
        });
      }
      /**
       * unknown tur sayılarını bulduk (detaylı)
       */
      for (let i = 0; i < this.unknownTur.length; i++) {
        this.creatures.forEach(element => {
          if (this.unknownTur[i].includes(element.taxonomy[2])) {
            this.unknownTurSayisi[i].push(this.unknownTur[i]);
          }
        });
      }
      console.log(this.aliveFamilya.length, this.aliveCins.length, this.aliveTur.length);
      console.log(this.deadFamilya.length, this.deadCins.length, this.deadTur.length);
      console.log(this.unknownFamilya.length, this.aliveCins.length, this.aliveTur.length);

      console.log(this.aliveFamilyaSayisi, "==", this.aliveFamilyaSayisi.length);
      console.log(this.aliveCinsSayisi, "==", this.aliveCinsSayisi.length);
      console.log(this.aliveTurSayisi, "==", this.aliveTurSayisi.length);

      console.log(this.deadFamilyaSayisi, "==", this.deadFamilyaSayisi.length);
      console.log(this.deadCinsSayisi, "==", this.deadCinsSayisi.length);
      console.log(this.deadTurSayisi, "==", this.deadTurSayisi.length);

      console.log(this.unknownFamilyaSayisi, "==", this.unknownFamilyaSayisi.length);
      console.log(this.unknownCinsSayisi, "==", this.unknownCinsSayisi.length);
      console.log(this.unknownTurSayisi, "==", this.unknownTurSayisi.length);
     
    });
  }
  showAgeDietRelation() {
    this.showAgeDiet = !this.showAgeDiet;
  }

  showStatusTaxonomiesRelation() {
    this.showAgeDiet = !this.showAgeDiet;
  }

  showAliveCount() {
    this.showAliveBtn = !this.showAliveBtn;
  }
  showDeadCount() {
    this.showDeadBtn = !this.showDeadBtn;
  }
  showUnknownCount() {
    this.showUnknownBtn = !this.showUnknownBtn;
  }
  refreshTable() {

    let alive = 0;
    let dead = 0;
    let unknown = 0;
    this.young = 0;
    this.adult = 0;
    this.elder = 0;
    this.aliveHerbivore = 0;
    this.aliveCarnivore = 0;
    this.elderHerbivore = 0;
    this.adultHerbivore = 0;
    this.youngHerbivore = 0;
    this.youngCarnivore = 0;
    this.elderCarnivore = 0;
    this.adultCarnivore = 0;
    this.deadYoung = 0;
    this.deadYoungCarnivore = 0;
    this.deadYoungHerbivore = 0;
    this.deadHerbivore = 0;
    this.deadCarnivore = 0;
    this.unknownElder = 0;
    this.unknownElderHerbivore = 0;
    this.unknownElderCarnivore = 0;
    this.unknownYoung = 0;
    this.unknownYoungHerbivore = 0;
    this.unknownYoungCarnivore = 0;
    this.deadAdult = 0;
    this.deadAdultHerbivore = 0;
    this.deadAdultCarnivore = 0;
    this.deadElder = 0;
    this.deadElderHerbivore = 0;
    this.deadElderCarnivore = 0;
    this.unknownAdult = 0;
    this.unknownAdultHerbivore = 0;
    this.unknownAdultCarnivore = 0;
    this.unknownHerbivore = 0;
    this.unknownCarnivore = 0;
    // console.log(this.selectedDay);
    this.allArray.forEach(element => {
      if (element[0].includes(this.selectedDay)) {
        this.showingCreatures = element[1];
        this.showingCreatures.forEach((elementStatus) => {
          if (elementStatus.status == "alive") {
            alive++;
            if (elementStatus.age == "young") {
              this.young++;
              if (elementStatus.diet == "herbivore") {
                this.youngHerbivore++;
              }
              if (elementStatus.diet == "carnivore") {
                this.youngCarnivore++;
              }

            }
            if (elementStatus.age == "adult") {
              this.adult++;
              if (elementStatus.diet == "herbivore") {
                this.adultHerbivore++;
              }
              if (elementStatus.diet == "carnivore") {
                this.adultCarnivore++;
              }

            }
            if (elementStatus.age == "elder") {
              this.elder++;
              if (elementStatus.diet == "herbivore") {
                this.elderHerbivore++;
              }
              if (elementStatus.diet == "carnivore") {
                this.elderCarnivore++;
              }

            }
            if (elementStatus.diet == "herbivore") {
              this.aliveHerbivore++;
            }
            if (elementStatus.diet == "carnivore") {
              this.aliveCarnivore++;
            }
          }
          if (elementStatus.status == "dead") {
            dead++;
            if (elementStatus.age == "young") {
              this.deadYoung++;
              if (elementStatus.diet == "herbivore") {
                this.deadYoungHerbivore++;
              }
              if (elementStatus.diet == "carnivore") {
                this.deadYoungCarnivore++;
              }

            }
            if (elementStatus.age == "adult") {
              this.deadAdult++;
              if (elementStatus.diet == "herbivore") {
                this.deadAdultHerbivore++;
              }
              if (elementStatus.diet == "carnivore") {
                this.deadAdultCarnivore++;
              }

            }
            if (elementStatus.age == "elder") {
              this.deadElder++;
              if (elementStatus.diet == "herbivore") {
                this.deadElderHerbivore++;
              }
              if (elementStatus.diet == "carnivore") {
                this.deadElderCarnivore++;
              }

            }
            if (elementStatus.diet == "herbivore") {
              this.deadHerbivore++;
            }
            if (elementStatus.diet == "carnivore") {
              this.deadCarnivore++;
            }
          }
          if (elementStatus.status == "unknown") {
            unknown++;
            if (elementStatus.age == "young") {
              this.unknownYoung++;
              if (elementStatus.diet == "herbivore") {
                this.unknownYoungHerbivore++;
              }
              if (elementStatus.diet == "carnivore") {
                this.unknownYoungCarnivore++;
              }

            }
            if (elementStatus.age == "adult") {
              this.unknownAdult++;
              if (elementStatus.diet == "herbivore") {
                this.unknownAdultHerbivore++
              }
              if (elementStatus.diet == "carnivore") {
                this.unknownAdultCarnivore++
              }

            }
            if (elementStatus.age == "elder") {
              this.unknownElder++;
              if (elementStatus.diet == "herbivore") {
                this.unknownElderHerbivore++
              }
              if (elementStatus.diet == "carnivore") {
                this.unknownElderCarnivore++
              }

            }
            if (elementStatus.diet == "herbivore") {
              this.unknownHerbivore++;
            }
            if (elementStatus.diet == "carnivore") {
              this.unknownCarnivore++;
            }
          }
        })
        this.chartHovered(alive, dead, unknown);
        //console.log(this.times);
      }
    })
  }

  chartHovered(alive, dead, unknown) {

    this.pieChartDataToday = [alive, dead, unknown];
  }
  showList() {
    this.showListVar = !this.showListVar;
  }

  pieClickHandler(event: any) {
    if (event.active[0]._index == 0) {
      this.aliveRadarChart = !this.aliveRadarChart;
    }
    if (event.active[0]._index == 1) {
      this.deadRadarChart = !this.deadRadarChart;
    }
    if (event.active[0]._index == 2) {
      this.unknownRadarChart = !this.unknownRadarChart;
    }
  }

}

