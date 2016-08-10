import { Component } from '@angular/core';
import { Battle, Weapon, SalBodyPart } from "./battle.model";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Laughing Sal';

  constructor() {
    // this.testBattle1();
    this.testPerfectBattle();
  }

  testBattle1() {
    let battle: Battle = new Battle();
    console.log(`Fresh battle: Selection = None, 6 remaining. Sal WAITING_FOR_SWORD_TO_THE_BODY at 100% health ${battle}`);

    battle.selectWeapon(Weapon.LIGHTNING);
    console.log(`Select lightning: Selection = LIGHTNING, 6 remaining. Sal WAITING_FOR_SWORD_TO_THE_BODY at 100% health  ${battle}`);

    battle.attackSal(SalBodyPart.HANDS);
    console.log(`Attached wrong location: Selection = None, 5 remaining. Sal MISTAKE_MADE at 100% health ${battle}`);

    battle.attackSal(SalBodyPart.HANDS);
    console.log(`Attached with no weapon: No change from prior state ${battle}`);

    battle.selectWeapon(Weapon.LIGHTNING);
    console.log(`Select lightning again: No change from prior state  ${battle}`);

    battle.selectWeapon(Weapon.FIRE);
    battle.attackSal(SalBodyPart.BODY);
    console.log(`Attack FIRE: Selection = None, 4 remaining. Sal MISTAKE_MADE at 85% health  ${battle}`);

    battle.selectWeapon(Weapon.WATER);
    battle.attackSal(SalBodyPart.HEAD);
    console.log(`Attack WATER: Selection = None, 3 remaining. Sal MISTAKE_MADE at 70% health  ${battle}`);

    battle.selectWeapon(Weapon.ICE);
    battle.attackSal(SalBodyPart.HEAD);
    console.log(`Attack ICE: Selection = None, 2 remaining. Sal MISTAKE_MADE at 55% health  ${battle}`);

    battle.selectWeapon(Weapon.SWORD);
    battle.attackSal(SalBodyPart.BODY);
    console.log(`Attack SWORD: Selection = None, 1 remaining. Sal MISTAKE_MADE at 40% health  ${battle}`);

    console.log(`Is battle still going ${battle.isBattleStillInProgress() ? "Yes" : "No"}`);
    console.log(`Is Sal dead ${battle.isSalDead() ? "Yes" : "No"}`);

    battle.selectWeapon(Weapon.MUD);
    battle.attackSal(SalBodyPart.HANDS);
    console.log(`Attack MUD: Selection = None, 0 remaining. Sal MISTAKE_MADE at 25% health  ${battle}`);

    console.log(`Is battle still going ${battle.isBattleStillInProgress() ? "Yes" : "No"}`);
    console.log(`Is Sal dead ${battle.isSalDead() ? "Yes" : "No"}`);
  }

  testPerfectBattle() {
    let battle: Battle = new Battle();
    console.log(`Fresh battle: Selection = None, 6 remaining. Sal WAITING_FOR_SWORD_TO_THE_BODY at 100% health ${battle}`);

    battle.selectWeapon(Weapon.SWORD);
    battle.attackSal(SalBodyPart.BODY);
    console.log(`Attack SWORD: Selection = None, 5 remaining. Sal WAITING_FOR_FIRE_TO_THE_BODY at 85% health  ${battle}`);

    battle.selectWeapon(Weapon.FIRE);
    battle.attackSal(SalBodyPart.BODY);
    console.log(`Attack FIRE: Selection = None, 4 remaining. Sal WAITING_FOR_ICE_TO_THE_HEAD at 70% health  ${battle}`);

    battle.selectWeapon(Weapon.ICE);
    battle.attackSal(SalBodyPart.HEAD);
    console.log(`Attack ICE: Selection = None, 3 remaining. Sal WAITING_FOR_LIGHTNING_TO_THE_HEAD at 55% health  ${battle}`);

    battle.selectWeapon(Weapon.LIGHTNING);
    battle.attackSal(SalBodyPart.HEAD);
    console.log(`Attached LIGHTNING: Selection = None, 2 remaining. Sal WAITING_FOR_MUD_TO_THE_HANDS at 40% health  ${battle}`);

    battle.selectWeapon(Weapon.MUD);
    battle.attackSal(SalBodyPart.HANDS);
    console.log(`Attack MUD: Selection = None, 1 remaining. Sal WAITING_FOR_WATER_TO_THE_HEAD at 25% health  ${battle}`);

    console.log(`Is battle still going ${battle.isBattleStillInProgress() ? "Yes" : "No"}`);
    console.log(`Is Sal dead ${battle.isSalDead() ? "Yes" : "No"}`);

    battle.selectWeapon(Weapon.WATER);
    battle.attackSal(SalBodyPart.HEAD);
    console.log(`Attack WATER: Selection = None, 0 remaining. Sal VICTORY at 10% health  ${battle}`);

    console.log(`Is battle still going ${battle.isBattleStillInProgress() ? "Yes" : "No"}`);
    console.log(`Is Sal dead ${battle.isSalDead() ? "Yes" : "No"}`);
  }

}
