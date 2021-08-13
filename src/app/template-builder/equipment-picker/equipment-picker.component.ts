import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import {
  DamageTier,
  EquipmentType,
  MagicTier,
  MaterialTier,
  PowerType,
  ProtectionTier,
  SlayerTier,
} from 'src/app/interfaces/equipment';
import { SubSink } from 'subsink';
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

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.subsink.add(
      this.addEquipmentForm
        .get('equipmentType')!
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe(() => this.addEquipmentForm.patchValue({ powerType: null })),
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
  protectionTier: ProtectionTier.Regular
};

interface AddEquipmentFormData {
  equipmentType: EquipmentType | null;
  powerType: PowerType | null;
  materialTier: MaterialTier | null;
  isExceptional: boolean;
  slayerTier: SlayerTier | null;
  damageTier: DamageTier | null;
  artistryTier: MagicTier | null;
  potencyTier: MagicTier | null;
  accuracyTier: MagicTier | null;
  protectionTier: ProtectionTier | null;
}
