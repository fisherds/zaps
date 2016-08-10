
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

enum SalBodyPart {
  HEAD,
  BODY,
  HANDS,
}

enum Weapon {
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
    this.weapons = new Weapons();
    this.sal = new Sal();
  }

  selectWeapon(weapon: Weapon) {
    // Inform the Weapons object, then do very little as that doesn't effect the battle yet.
    this.weapons.selectWeapon(weapon);

  }

  attackSal(bodyPart: SalBodyPart) {

  }

  toString() {
    return `
    Weapons: ${this.weapons}
    Sal: ${this.sal}
    `;
  }
}

// Private helper model object.  All calls go via the Battle.
class Sal {

  public salState: SalState = SalState.WAITING_FOR_SWORD_TO_THE_BODY;

  reset() {

  }

  toString () {
    return `state = ${SalState[this.salState]}`;
  }
}

// Private helper model object.  All calls go via the Battle.
class Weapons {

  private selectedWeapon: Weapon; // or null
  private hasWeaponSelected: boolean; // It's a pain in JavaScript to be sure null isn't == 0, so just avoiding the headache of distinguishin between Weapon.SWORD and null.
  private remainingWeapons: Array<boolean> = new Array<boolean>();  // Array of 6 booleans in the order of the Weapon enum

  constructor() {
    this.hasWeaponSelected = false;
    this.selectedWeapon = null;
    this.remainingWeapons = Array(6).fill(true);
  }
  
  selectWeapon(weapon: Weapon) {
    this.hasWeaponSelected = true;
    this.selectedWeapon = weapon;
  }

  attachWithSelectedWeapon(): Weapon {
    if (!this.hasWeaponSelected) {
      console.log("attachWithSelectedWeapon was called when no weapon was selected!!!");
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
    for (let isRemaining in this.remainingWeapons) {
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