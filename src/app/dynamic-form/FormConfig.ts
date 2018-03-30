interface ControlObject {
  type: string;
  question: string;
  conditionType?: string;
  conditionValue?: number | string
  dynamicControls: ControlObject[]
}

interface FormConfig extends Array<ControlObject> { }
