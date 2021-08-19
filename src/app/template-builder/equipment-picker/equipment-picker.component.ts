import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import {
  AddEquipmentFormData,
  DamageTier,
  EquipmentType,
  MagicTier,
  MaterialTier,
  PowerType,
  ProtectionTier,
  SlayerTier,
} from 'src/app/interfaces/equipment';
import { SubSink } from 'subsink';
import {
  addSpellbookAction,
  addWeaponAction,
  removeEquipmentAction,
} from '../state/actions/template.actions';
import { selectTemplateState } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-equipment-picker',
  templateUrl: './equipment-picker.component.html',
  styleUrls: ['./equipment-picker.component.scss'],
})
export class EquipmentPickerComponent implements OnInit, OnDestroy {
  readonly subsink = new SubSink();
  readonly addEquipmentForm = this.fb.group(ADD_EQUIPMENT_DEFAULT);

  readonly equipmentState$ = this.store.pipe(
    select(selectTemplateState),
    select((s) => s.equipment)
  );
  readonly equippedWeapon$ = this.equipmentState$.pipe(select((s) => s.weapon));
  readonly equippedSpellbook$ = this.equipmentState$.pipe(
    select((s) => s.spellbook)
  );

  readonly pickableEquipmentTypes$: Observable<
    { display: string; value: string }[]
  > = this.equipmentState$.pipe(
    map((s) =>
      Object.entries(s)
        .filter(([key, value]) => value == null)
        .map(([key, value]) => ({
          display: Object.entries(EquipmentType).find(
            ([eKey, eValue]) => eValue === key
          )![0],
          value: key,
        }))
    )
  );
  readonly pickedEquipmentType$ = this.addEquipmentForm
    .get('equipmentType')!
    .valueChanges.pipe(shareReplay(1));

  readonly pickedPowerType$ = this.addEquipmentForm
    .get('powerType')!
    .valueChanges.pipe(shareReplay(1));

  readonly materialTiers = Object.entries(MaterialTier)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      display: key,
      value,
    }));
  readonly powerTypes = Object.entries(PowerType).map(([key, value]) => ({
    display: key,
    value,
  }));
  readonly slayerTiers = Object.entries(SlayerTier)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      display: key,
      value,
    }));
  readonly magicTiers = Object.entries(MagicTier)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      display: key,
      value,
    }));
  readonly damageTiers = Object.entries(DamageTier)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      display: key,
      value,
    }));

    readonly equipmentType = EquipmentType;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.subsink.add(
      this.addEquipmentForm
        .get('equipmentType')!
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe(() =>
          this.addEquipmentForm.patchValue({ powerType: PowerType.Regular })
        ),
      this.addEquipmentForm
        .get('powerType')!
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe(() =>
          this.addEquipmentForm.patchValue({
            materialTier: MaterialTier.Regular,
            isExceptional: false,
            slayerTier: SlayerTier.None,
            damageTier: DamageTier.Regular,
            artistryTier: MagicTier.Regular,
            potencyTier: MagicTier.Regular,
            accuracyTier: MagicTier.Regular,
          })
        )
    );
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  addEquipment() {
    const form: AddEquipmentFormData = this.addEquipmentForm.value;
    switch (form.equipmentType) {
      case EquipmentType.Spellbook:
        this.store.dispatch(
          addSpellbookAction({
            newSpellbook: {
              damageTier: form.damageTier,
              isExceptional: form.isExceptional,
              materialTier: form.materialTier,
              potencyTier: form.potencyTier,
              powerType: form.powerType,
              slayerTier: form.slayerTier,
            },
          })
        );
        break;
      case EquipmentType.Weapon:
        this.store.dispatch(
          addWeaponAction({
            newWeapon: {
              damageTier: form.damageTier,
              isExceptional: form.isExceptional,
              materialTier: form.materialTier,
              accuracyTier: form.accuracyTier,
              powerType: form.powerType,
              slayerTier: form.slayerTier,
            },
          })
        );
        break;
    }
    this.addEquipmentForm.patchValue(ADD_EQUIPMENT_DEFAULT);
  }

  removeEquipment(type: EquipmentType) {
    this.store.dispatch(removeEquipmentAction({ equipmentType: type }));
  }
}

const ADD_EQUIPMENT_DEFAULT: AddEquipmentFormData = {
  equipmentType: null,
  powerType: PowerType.Regular,
  materialTier: MaterialTier.Regular,
  isExceptional: false,
  slayerTier: SlayerTier.None,
  damageTier: DamageTier.Regular,
  artistryTier: MagicTier.Regular,
  potencyTier: MagicTier.Regular,
  accuracyTier: MagicTier.Regular,
  protectionTier: ProtectionTier.Regular,
};
