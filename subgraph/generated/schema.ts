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

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Token entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Token entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Token", id.toString(), this);
  }

  static load(id: string): Token | null {
    return store.get("Token", id) as Token | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get policyAddress(): Bytes {
    let value = this.get("policyAddress");
    return value.toBytes();
  }

  set policyAddress(value: Bytes) {
    this.set("policyAddress", Value.fromBytes(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get circulatingSupply(): BigDecimal {
    let value = this.get("circulatingSupply");
    return value.toBigDecimal();
  }

  set circulatingSupply(value: BigDecimal) {
    this.set("circulatingSupply", Value.fromBigDecimal(value));
  }

  get lockedBalance(): BigDecimal {
    let value = this.get("lockedBalance");
    return value.toBigDecimal();
  }

  set lockedBalance(value: BigDecimal) {
    this.set("lockedBalance", Value.fromBigDecimal(value));
  }

  get decimals(): i32 {
    let value = this.get("decimals");
    return value.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get nextRebaseTimestamp(): BigInt {
    let value = this.get("nextRebaseTimestamp");
    return value.toBigInt();
  }

  set nextRebaseTimestamp(value: BigInt) {
    this.set("nextRebaseTimestamp", Value.fromBigInt(value));
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

  get baseCpi(): BigDecimal {
    let value = this.get("baseCpi");
    return value.toBigDecimal();
  }

  set baseCpi(value: BigDecimal) {
    this.set("baseCpi", Value.fromBigDecimal(value));
  }

  get rebaseWindowOffset(): BigInt {
    let value = this.get("rebaseWindowOffset");
    return value.toBigInt();
  }

  set rebaseWindowOffset(value: BigInt) {
    this.set("rebaseWindowOffset", Value.fromBigInt(value));
  }

  get rebaseWindowLength(): BigInt {
    let value = this.get("rebaseWindowLength");
    return value.toBigInt();
  }

  set rebaseWindowLength(value: BigInt) {
    this.set("rebaseWindowLength", Value.fromBigInt(value));
  }

  get minRebaseTime(): BigInt {
    let value = this.get("minRebaseTime");
    return value.toBigInt();
  }

  set minRebaseTime(value: BigInt) {
    this.set("minRebaseTime", Value.fromBigInt(value));
  }

  get deviationTreshold(): BigDecimal {
    let value = this.get("deviationTreshold");
    return value.toBigDecimal();
  }

  set deviationTreshold(value: BigDecimal) {
    this.set("deviationTreshold", Value.fromBigDecimal(value));
  }

  get rebaseHistory(): Array<string> {
    let value = this.get("rebaseHistory");
    return value.toStringArray();
  }

  set rebaseHistory(value: Array<string>) {
    this.set("rebaseHistory", Value.fromStringArray(value));
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

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
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

  get blocknumber(): BigInt {
    let value = this.get("blocknumber");
    return value.toBigInt();
  }

  set blocknumber(value: BigInt) {
    this.set("blocknumber", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }

  get newSupply(): BigDecimal {
    let value = this.get("newSupply");
    return value.toBigDecimal();
  }

  set newSupply(value: BigDecimal) {
    this.set("newSupply", Value.fromBigDecimal(value));
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
}