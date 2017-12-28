/* @flow */
/* eslint-disable no-use-before-define */

type PropsType = { [key: string]: any };
type DefaultPropsType = { [key: string]: any };

export type StringTreeNode = {|
  type: 'string',
  value: string,
|};

export type NumberTreeNode = {|
  type: 'number',
  value: number,
|};

export type ArrayTreeNode = {|
  type: 'array',
  value: array,
|};

export type ReactElementTreeNode = {|
  type: 'ReactElement',
  displayName: string,
  props: PropsType,
  defaultProps: DefaultPropsType,
  childrens: TreeNode[],
|};

export type TreeNode =
  | StringTreeNode
  | NumberTreeNode
  | ArrayTreeNode
  | ReactElementTreeNode;

export const createStringTreeNode = (value: string): StringTreeNode => ({
  type: 'string',
  value,
});

export const createNumberTreeNode = (value: number): NumberTreeNode => ({
  type: 'number',
  value,
});

export const createArrayTreeNode = (value: array): ArrayTreeNode => ({
  type: 'array',
  value,
});

export const createReactElementTreeNode = (
  displayName: string,
  props: PropsType,
  defaultProps: DefaultPropsType,
  childrens: TreeNode[]
): ReactElementTreeNode => ({
  type: 'ReactElement',
  displayName,
  props,
  defaultProps,
  childrens,
});
