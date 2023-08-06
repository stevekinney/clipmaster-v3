type Clipping = {
  id: string;
  type?: string;
  value: string;
};

type RemoveClippingAction = {
  type: 'remove';
  id: string;
};

type AddClippingAction = {
  type: 'add';
  value: string;
};

type UpdateClippingAction = {
  type: 'update';
  id: string;
  value: string;
};

type ClippingAction =
  | RemoveClippingAction
  | AddClippingAction
  | UpdateClippingAction;
