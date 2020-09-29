// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ProviderAdded extends ethereum.Event {
  get params(): ProviderAdded__Params {
    return new ProviderAdded__Params(this);
  }
}

export class ProviderAdded__Params {
  _event: ProviderAdded;

  constructor(event: ProviderAdded) {
    this._event = event;
  }

  get provider(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ProviderRemoved extends ethereum.Event {
  get params(): ProviderRemoved__Params {
    return new ProviderRemoved__Params(this);
  }
}

export class ProviderRemoved__Params {
  _event: ProviderRemoved;

  constructor(event: ProviderRemoved) {
    this._event = event;
  }

  get provider(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ReportTimestampOutOfRange extends ethereum.Event {
  get params(): ReportTimestampOutOfRange__Params {
    return new ReportTimestampOutOfRange__Params(this);
  }
}

export class ReportTimestampOutOfRange__Params {
  _event: ReportTimestampOutOfRange;

  constructor(event: ReportTimestampOutOfRange) {
    this._event = event;
  }

  get provider(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ProviderReportPushed extends ethereum.Event {
  get params(): ProviderReportPushed__Params {
    return new ProviderReportPushed__Params(this);
  }
}

export class ProviderReportPushed__Params {
  _event: ProviderReportPushed;

  constructor(event: ProviderReportPushed) {
    this._event = event;
  }

  get provider(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get payload(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnershipRenounced extends ethereum.Event {
  get params(): OwnershipRenounced__Params {
    return new OwnershipRenounced__Params(this);
  }
}

export class OwnershipRenounced__Params {
  _event: OwnershipRenounced;

  constructor(event: OwnershipRenounced) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Oracle__getDataResult {
  value0: BigInt;
  value1: boolean;

  constructor(value0: BigInt, value1: boolean) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromBoolean(this.value1));
    return map;
  }
}

export class Oracle__providerReportsResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class Oracle extends ethereum.SmartContract {
  static bind(address: Address): Oracle {
    return new Oracle("Oracle", address);
  }

  reportDelaySec(): BigInt {
    let result = super.call("reportDelaySec", "reportDelaySec():(uint256)", []);

    return result[0].toBigInt();
  }

  try_reportDelaySec(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "reportDelaySec",
      "reportDelaySec():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getData(): Oracle__getDataResult {
    let result = super.call("getData", "getData():(uint256,bool)", []);

    return new Oracle__getDataResult(
      result[0].toBigInt(),
      result[1].toBoolean()
    );
  }

  try_getData(): ethereum.CallResult<Oracle__getDataResult> {
    let result = super.tryCall("getData", "getData():(uint256,bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Oracle__getDataResult(value[0].toBigInt(), value[1].toBoolean())
    );
  }

  providers(param0: BigInt): Address {
    let result = super.call("providers", "providers(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_providers(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("providers", "providers(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isOwner(): boolean {
    let result = super.call("isOwner", "isOwner():(bool)", []);

    return result[0].toBoolean();
  }

  try_isOwner(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isOwner", "isOwner():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  minimumProviders(): BigInt {
    let result = super.call(
      "minimumProviders",
      "minimumProviders():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_minimumProviders(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "minimumProviders",
      "minimumProviders():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  providersSize(): BigInt {
    let result = super.call("providersSize", "providersSize():(uint256)", []);

    return result[0].toBigInt();
  }

  try_providersSize(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "providersSize",
      "providersSize():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  reportExpirationTimeSec(): BigInt {
    let result = super.call(
      "reportExpirationTimeSec",
      "reportExpirationTimeSec():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_reportExpirationTimeSec(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "reportExpirationTimeSec",
      "reportExpirationTimeSec():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  providerReports(
    param0: Address,
    param1: BigInt
  ): Oracle__providerReportsResult {
    let result = super.call(
      "providerReports",
      "providerReports(address,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return new Oracle__providerReportsResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_providerReports(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<Oracle__providerReportsResult> {
    let result = super.tryCall(
      "providerReports",
      "providerReports(address,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Oracle__providerReportsResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }
}

export class PushReportCall extends ethereum.Call {
  get inputs(): PushReportCall__Inputs {
    return new PushReportCall__Inputs(this);
  }

  get outputs(): PushReportCall__Outputs {
    return new PushReportCall__Outputs(this);
  }
}

export class PushReportCall__Inputs {
  _call: PushReportCall;

  constructor(call: PushReportCall) {
    this._call = call;
  }

  get payload(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class PushReportCall__Outputs {
  _call: PushReportCall;

  constructor(call: PushReportCall) {
    this._call = call;
  }
}

export class GetDataCall extends ethereum.Call {
  get inputs(): GetDataCall__Inputs {
    return new GetDataCall__Inputs(this);
  }

  get outputs(): GetDataCall__Outputs {
    return new GetDataCall__Outputs(this);
  }
}

export class GetDataCall__Inputs {
  _call: GetDataCall;

  constructor(call: GetDataCall) {
    this._call = call;
  }
}

export class GetDataCall__Outputs {
  _call: GetDataCall;

  constructor(call: GetDataCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get value1(): boolean {
    return this._call.outputValues[1].value.toBoolean();
  }
}

export class AddProviderCall extends ethereum.Call {
  get inputs(): AddProviderCall__Inputs {
    return new AddProviderCall__Inputs(this);
  }

  get outputs(): AddProviderCall__Outputs {
    return new AddProviderCall__Outputs(this);
  }
}

export class AddProviderCall__Inputs {
  _call: AddProviderCall;

  constructor(call: AddProviderCall) {
    this._call = call;
  }

  get provider(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddProviderCall__Outputs {
  _call: AddProviderCall;

  constructor(call: AddProviderCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RemoveProviderCall extends ethereum.Call {
  get inputs(): RemoveProviderCall__Inputs {
    return new RemoveProviderCall__Inputs(this);
  }

  get outputs(): RemoveProviderCall__Outputs {
    return new RemoveProviderCall__Outputs(this);
  }
}

export class RemoveProviderCall__Inputs {
  _call: RemoveProviderCall;

  constructor(call: RemoveProviderCall) {
    this._call = call;
  }

  get provider(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveProviderCall__Outputs {
  _call: RemoveProviderCall;

  constructor(call: RemoveProviderCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class PurgeReportsCall extends ethereum.Call {
  get inputs(): PurgeReportsCall__Inputs {
    return new PurgeReportsCall__Inputs(this);
  }

  get outputs(): PurgeReportsCall__Outputs {
    return new PurgeReportsCall__Outputs(this);
  }
}

export class PurgeReportsCall__Inputs {
  _call: PurgeReportsCall;

  constructor(call: PurgeReportsCall) {
    this._call = call;
  }
}

export class PurgeReportsCall__Outputs {
  _call: PurgeReportsCall;

  constructor(call: PurgeReportsCall) {
    this._call = call;
  }
}

export class SetReportDelaySecCall extends ethereum.Call {
  get inputs(): SetReportDelaySecCall__Inputs {
    return new SetReportDelaySecCall__Inputs(this);
  }

  get outputs(): SetReportDelaySecCall__Outputs {
    return new SetReportDelaySecCall__Outputs(this);
  }
}

export class SetReportDelaySecCall__Inputs {
  _call: SetReportDelaySecCall;

  constructor(call: SetReportDelaySecCall) {
    this._call = call;
  }

  get reportDelaySec_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetReportDelaySecCall__Outputs {
  _call: SetReportDelaySecCall;

  constructor(call: SetReportDelaySecCall) {
    this._call = call;
  }
}

export class SetMinimumProvidersCall extends ethereum.Call {
  get inputs(): SetMinimumProvidersCall__Inputs {
    return new SetMinimumProvidersCall__Inputs(this);
  }

  get outputs(): SetMinimumProvidersCall__Outputs {
    return new SetMinimumProvidersCall__Outputs(this);
  }
}

export class SetMinimumProvidersCall__Inputs {
  _call: SetMinimumProvidersCall;

  constructor(call: SetMinimumProvidersCall) {
    this._call = call;
  }

  get minimumProviders_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetMinimumProvidersCall__Outputs {
  _call: SetMinimumProvidersCall;

  constructor(call: SetMinimumProvidersCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class SetReportExpirationTimeSecCall extends ethereum.Call {
  get inputs(): SetReportExpirationTimeSecCall__Inputs {
    return new SetReportExpirationTimeSecCall__Inputs(this);
  }

  get outputs(): SetReportExpirationTimeSecCall__Outputs {
    return new SetReportExpirationTimeSecCall__Outputs(this);
  }
}

export class SetReportExpirationTimeSecCall__Inputs {
  _call: SetReportExpirationTimeSecCall;

  constructor(call: SetReportExpirationTimeSecCall) {
    this._call = call;
  }

  get reportExpirationTimeSec_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetReportExpirationTimeSecCall__Outputs {
  _call: SetReportExpirationTimeSecCall;

  constructor(call: SetReportExpirationTimeSecCall) {
    this._call = call;
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get reportExpirationTimeSec_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get reportDelaySec_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get minimumProviders_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}
