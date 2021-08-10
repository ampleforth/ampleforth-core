// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class MedianOracle extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save MedianOracle entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save MedianOracle entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("MedianOracle", id.toString(), this);
  }

  static load(id: string): MedianOracle | null {
    return store.get("MedianOracle", id) as MedianOracle | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get reportDelaySec(): BigInt {
    let value = this.get("reportDelaySec");
    return value.toBigInt();
  }

  set reportDelaySec(value: BigInt) {
    this.set("reportDelaySec", Value.fromBigInt(value));
  }

  get reportExpirationTimeSec(): BigInt {
    let value = this.get("reportExpirationTimeSec");
    return value.toBigInt();
  }

  set reportExpirationTimeSec(value: BigInt) {
    this.set("reportExpirationTimeSec", Value.fromBigInt(value));
  }

  get minimumProviders(): BigInt {
    let value = this.get("minimumProviders");
    return value.toBigInt();
  }

  set minimumProviders(value: BigInt) {
    this.set("minimumProviders", Value.fromBigInt(value));
  }

  get providers(): Array<string> {
    let value = this.get("providers");
    return value.toStringArray();
  }

  set providers(value: Array<string>) {
    this.set("providers", Value.fromStringArray(value));
  }

  get reports(): Array<string> {
    let value = this.get("reports");
    return value.toStringArray();
  }

  set reports(value: Array<string>) {
    this.set("reports", Value.fromStringArray(value));
  }
}

export class OracleProvider extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save OracleProvider entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save OracleProvider entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("OracleProvider", id.toString(), this);
  }

  static load(id: string): OracleProvider | null {
    return store.get("OracleProvider", id) as OracleProvider | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get active(): boolean {
    let value = this.get("active");
    return value.toBoolean();
  }

  set active(value: boolean) {
    this.set("active", Value.fromBoolean(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get oracle(): string {
    let value = this.get("oracle");
    return value.toString();
  }

  set oracle(value: string) {
    this.set("oracle", Value.fromString(value));
  }

  get reportCount(): BigInt {
    let value = this.get("reportCount");
    return value.toBigInt();
  }

  set reportCount(value: BigInt) {
    this.set("reportCount", Value.fromBigInt(value));
  }

  get activeReport1(): string | null {
    let value = this.get("activeReport1");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set activeReport1(value: string | null) {
    if (value === null) {
      this.unset("activeReport1");
    } else {
      this.set("activeReport1", Value.fromString(value as string));
    }
  }

  get activeReport2(): string | null {
    let value = this.get("activeReport2");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set activeReport2(value: string | null) {
    if (value === null) {
      this.unset("activeReport2");
    } else {
      this.set("activeReport2", Value.fromString(value as string));
    }
  }

  get reports(): Array<string> {
    let value = this.get("reports");
    return value.toStringArray();
  }

  set reports(value: Array<string>) {
    this.set("reports", Value.fromStringArray(value));
  }
}

export class OracleReport extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save OracleReport entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save OracleReport entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("OracleReport", id.toString(), this);
  }

  static load(id: string): OracleReport | null {
    return store.get("OracleReport", id) as OracleReport | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get oracle(): string {
    let value = this.get("oracle");
    return value.toString();
  }

  set oracle(value: string) {
    this.set("oracle", Value.fromString(value));
  }

  get provider(): string {
    let value = this.get("provider");
    return value.toString();
  }

  set provider(value: string) {
    this.set("provider", Value.fromString(value));
  }

  get report(): BigDecimal {
    let value = this.get("report");
    return value.toBigDecimal();
  }

  set report(value: BigDecimal) {
    this.set("report", Value.fromBigDecimal(value));
  }

  get nonce(): BigInt {
    let value = this.get("nonce");
    return value.toBigInt();
  }

  set nonce(value: BigInt) {
    this.set("nonce", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get purged(): boolean {
    let value = this.get("purged");
    return value.toBoolean();
  }

  set purged(value: boolean) {
    this.set("purged", Value.fromBoolean(value));
  }
}

export class Policy extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Policy entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Policy entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Policy", id.toString(), this);
  }

  static load(id: string): Policy | null {
    return store.get("Policy", id) as Policy | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get baseCPI(): BigDecimal {
    let value = this.get("baseCPI");
    return value.toBigDecimal();
  }

  set baseCPI(value: BigDecimal) {
    this.set("baseCPI", Value.fromBigDecimal(value));
  }

  get rebaseLag(): BigInt {
    let value = this.get("rebaseLag");
    return value.toBigInt();
  }

  set rebaseLag(value: BigInt) {
    this.set("rebaseLag", Value.fromBigInt(value));
  }

  get deviationThreshold(): BigDecimal {
    let value = this.get("deviationThreshold");
    return value.toBigDecimal();
  }

  set deviationThreshold(value: BigDecimal) {
    this.set("deviationThreshold", Value.fromBigDecimal(value));
  }

  get minRebaseTimeIntervalSec(): BigInt {
    let value = this.get("minRebaseTimeIntervalSec");
    return value.toBigInt();
  }

  set minRebaseTimeIntervalSec(value: BigInt) {
    this.set("minRebaseTimeIntervalSec", Value.fromBigInt(value));
  }

  get rebaseWindowOffsetSec(): BigInt {
    let value = this.get("rebaseWindowOffsetSec");
    return value.toBigInt();
  }

  set rebaseWindowOffsetSec(value: BigInt) {
    this.set("rebaseWindowOffsetSec", Value.fromBigInt(value));
  }

  get rebaseWindowLengthSec(): BigInt {
    let value = this.get("rebaseWindowLengthSec");
    return value.toBigInt();
  }

  set rebaseWindowLengthSec(value: BigInt) {
    this.set("rebaseWindowLengthSec", Value.fromBigInt(value));
  }

  get lastRebase(): string | null {
    let value = this.get("lastRebase");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lastRebase(value: string | null) {
    if (value === null) {
      this.unset("lastRebase");
    } else {
      this.set("lastRebase", Value.fromString(value as string));
    }
  }

  get rebases(): Array<string> {
    let value = this.get("rebases");
    return value.toStringArray();
  }

  set rebases(value: Array<string>) {
    this.set("rebases", Value.fromStringArray(value));
  }
}

export class Rebase extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Rebase entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Rebase entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Rebase", id.toString(), this);
  }

  static load(id: string): Rebase | null {
    return store.get("Rebase", id) as Rebase | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get policy(): string {
    let value = this.get("policy");
    return value.toString();
  }

  set policy(value: string) {
    this.set("policy", Value.fromString(value));
  }

  get epoch(): BigInt {
    let value = this.get("epoch");
    return value.toBigInt();
  }

  set epoch(value: BigInt) {
    this.set("epoch", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get supply(): BigDecimal {
    let value = this.get("supply");
    return value.toBigDecimal();
  }

  set supply(value: BigDecimal) {
    this.set("supply", Value.fromBigDecimal(value));
  }

  get previousSupply(): BigDecimal {
    let value = this.get("previousSupply");
    return value.toBigDecimal();
  }

  set previousSupply(value: BigDecimal) {
    this.set("previousSupply", Value.fromBigDecimal(value));
  }

  get precentageChange(): BigDecimal {
    let value = this.get("precentageChange");
    return value.toBigDecimal();
  }

  set precentageChange(value: BigDecimal) {
    this.set("precentageChange", Value.fromBigDecimal(value));
  }

  get supplyAdjustment(): BigDecimal {
    let value = this.get("supplyAdjustment");
    return value.toBigDecimal();
  }

  set supplyAdjustment(value: BigDecimal) {
    this.set("supplyAdjustment", Value.fromBigDecimal(value));
  }

  get targetRate(): BigDecimal {
    let value = this.get("targetRate");
    return value.toBigDecimal();
  }

  set targetRate(value: BigDecimal) {
    this.set("targetRate", Value.fromBigDecimal(value));
  }

  get marketRate(): BigDecimal {
    let value = this.get("marketRate");
    return value.toBigDecimal();
  }

  set marketRate(value: BigDecimal) {
    this.set("marketRate", Value.fromBigDecimal(value));
  }

  get cpi(): BigDecimal {
    let value = this.get("cpi");
    return value.toBigDecimal();
  }

  set cpi(value: BigDecimal) {
    this.set("cpi", Value.fromBigDecimal(value));
  }
}
