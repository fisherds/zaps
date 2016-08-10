export enum SalBodyPart {
  HEAD,
  BODY,
  HANDS,
}

// The order of this enum is used in a lot of places.  Be careful with changes.
// Note, this happens to be the correct order the weapons are used in as well.
export enum Weapon {
  SWORD,
  FIRE,
  ICE,
  LIGHTNING,
  MUD,
  WATER,
}

export class Battle {
  private weapons: Weapons;
  private sal: Sal;

  constructor() {
    this.reset(); // I can never decide if I want a reset or if I want to force the other end to just make a new object.
  }

  // -------------- Actions ------------------
  selectWeapon(weapon: Weapon) {
    // Inform the Weapons object, then do very little as that doesn't effect the battle yet.
    this.weapons.selectWeapon(weapon);
  }

  attackSal(bodyPart: SalBodyPart) {
    if (!this.weapons.hasWeaponSelected) {
      return;  // Silently do nothing.  Just pressed a body button at the wrong time.    
    }
    let useWeapon = this.weapons.useSelectedWeaponForAttack();
    this.sal.attack(useWeapon, bodyPart);
  }

  reset() {
    this.weapons = new Weapons();
    this.sal = new Sal();
  }

  // ---------------- Update view ---------------
  isBattleStillInProgress(): boolean {
    return this.weapons.hasWeaponsRemaining();
  }

  // Usually this is asked right after the question above.
  isSalDead(): boolean {
    return this.sal.isSalDead();
  }

  // Not really an indicator of death or state.  Just for the UI.
  getSalHealth(): number {
    return this.sal.health;
  }

  // Which button should be shown in the middle.
  getSelectedWeapon(): Weapon {
    if (this.weapons.hasWeaponSelected) {
      return this.weapons.selectedWeapon;
    }
    return null;
  }

  // Which buttons should be shown at the bottom.
  getSelectableWeaponsArray(): Array<boolean> {
    return this.weapons.getWeaponsVisibleToSelect();
  }

  toString() {
    return `
    Weapons: ${this.weapons}
    Sal: ${this.sal}
    `;
  }
}

// I would prefer this enum was WITHIN the Sal class, but the compiler didn't like that.
enum SalState {
  WAITING_FOR_SWORD_TO_THE_BODY, // no armor
  WAITING_FOR_FIRE_TO_THE_BODY, // icy heart
  WAITING_FOR_ICE_TO_THE_HEAD, // hot head
  WAITING_FOR_LIGHTNING_TO_THE_HEAD, // hear shocking news
  WAITING_FOR_MUD_TO_THE_HANDS, // hands dirty
  WAITING_FOR_WATER_TO_THE_HEAD, // makeup
  VICTORY,
  MISTAKE_MADE,
}

// Private helper model object.  All calls go via the Battle.
class Sal {

  public state: SalState;
  public health: number;

  // Sal starts at 100% - 6 hits of 15% = 10% health (which you only get the last 10 for being in the right order)
  DAMAGE_PER_HIT: number = 15;

  // Convenience calculation to know when Sal is at her min.  The last 10% comes from the order being correct.
  MIN_HEALTH: number = 10;

  // Array of 6 items in the order of the Weapons enum, showing where each weapon should be used.
  CORRECT_WEAPON_GUIDE: Array<SalBodyPart> = [SalBodyPart.BODY, SalBodyPart.BODY, SalBodyPart.HEAD, SalBodyPart.HEAD, SalBodyPart.HANDS, SalBodyPart.HEAD]

  constructor() {
    this.state = SalState.WAITING_FOR_SWORD_TO_THE_BODY;
    this.health = 100;
  }

  isSalDead() {
    return this.state == SalState.VICTORY;
  }

  attack(weapon: Weapon, location: SalBodyPart): boolean {
    if (location != this.CORRECT_WEAPON_GUIDE[weapon]) {
      this.state = SalState.MISTAKE_MADE;
      console.log("Attack to the wrong location. Ha ha!");
      return false;
    }
    if (this.state == SalState.VICTORY) {
      console.log("Sal just got hit when she was dead!");
      return;
    }
    this.health -= this.DAMAGE_PER_HIT; // Sal loses health even if the order is wrong.
    if (this.wasCorrectOrder(weapon)) {
      this.state++; // Move along the success path towards VICTORY.
    }
    return true;
  }

  // Note, this method is called AFTER the weapon<->location is known to be correct.  Only worry about order here.
  wasCorrectOrder(weapon: Weapon): boolean {
    switch (this.state) {
      case SalState.WAITING_FOR_SWORD_TO_THE_BODY:
        return weapon == Weapon.SWORD;
      case SalState.WAITING_FOR_FIRE_TO_THE_BODY:
        return weapon == Weapon.FIRE;
      case SalState.WAITING_FOR_ICE_TO_THE_HEAD:
        return weapon == Weapon.ICE;
      case SalState.WAITING_FOR_LIGHTNING_TO_THE_HEAD:
        return weapon == Weapon.LIGHTNING;
      case SalState.WAITING_FOR_MUD_TO_THE_HANDS:
        return weapon == Weapon.MUD;
      case SalState.WAITING_FOR_WATER_TO_THE_HEAD:
        return weapon == Weapon.WATER;
      case SalState.VICTORY:
        console.log("Checked order at unexpected time!");
      case SalState.MISTAKE_MADE:
        return false;
    }
  }

  toString() {
    return `state = ${SalState[this.state]}   health = ${this.health}%`;
  }
}

// Private helper model object.  All calls go via the Battle.
class Weapons {

  public selectedWeapon: Weapon; // or null
  public hasWeaponSelected: boolean; // It's a pain in JavaScript to be sure null isn't == 0, so just avoiding the headache of distinguishin between Weapon.SWORD and null.
  private remainingWeapons: Array<boolean> = new Array<boolean>();  // Array of 6 booleans in the order of the Weapon enum

  constructor() {
    this.hasWeaponSelected = false;
    this.selectedWeapon = null;
    this.remainingWeapons = Array(6).fill(true);
  }

  selectWeapon(weapon: Weapon) {
    if (!this.remainingWeapons[weapon]) {
      console.log("selectWeapon was called for a weapon that was not remaining!");
      return;
    }
    this.hasWeaponSelected = true;
    this.selectedWeapon = weapon;
  }

  // Updates the weapons object and return the selected weapon that is being used for this attack.
  useSelectedWeaponForAttack(): Weapon {
    if (!this.hasWeaponSelected) {
      console.log("attachWithSelectedWeapon was called when no weapon was selected!");
      return null;
    }
    let weaponToReturn = this.selectedWeapon;
    this.hasWeaponSelected = false;
    this.remainingWeapons[this.selectedWeapon] = false;
    this.selectedWeapon = null;
    return weaponToReturn;
  }

  // Returns an array of 6 booleans in the order of the Weapons enum.  Does NOT include the selected weapon.
  getWeaponsVisibleToSelect(): Array<boolean> {
    // Basically clone the this.remainingWeapons but set the selected weapon to false.
    var visibleWeapons: Array<boolean> = new Array<boolean>();
    for (let i = Weapon.SWORD; i < this.remainingWeapons.length; i++) {
      if (i == this.selectedWeapon) {
        visibleWeapons.push(false);
      } else {
        visibleWeapons.push(this.remainingWeapons[i]);
      }
    }
    return visibleWeapons;
  }

  getNumWeaponsRemaining(): number {
    var numRemaining: number = 0;
    for (let isRemaining of this.remainingWeapons) {
      if (isRemaining) {
        numRemaining++;
      }
    }
    return numRemaining;
  }

  hasWeaponsRemaining(): boolean {
    return this.getNumWeaponsRemaining() > 0;
  }

  toString() {
    var selectedWeapon: string = "None";
    if (this.hasWeaponSelected) {
      selectedWeapon = Weapon[this.selectedWeapon];
    }

    var remainingWeapons: string = "";
    for (let i = Weapon.SWORD; i < this.remainingWeapons.length; i++) {
      let isRemaining = this.remainingWeapons[i];
      if (isRemaining) {
        remainingWeapons += Weapon[i] + " ";
      }
    }
    return `Selected = ${selectedWeapon}   ${this.getNumWeaponsRemaining()} remaining = ${remainingWeapons}`
  }
}