/* @flow */

import formatReactElementNode from './formatReactElementNode';
import type { Options } from './../options';
import type { TreeNode } from './../tree';

const jsxStopChars = ['<', '>', '{', '}'];
const shouldBeEscaped = (s: string) =>
  jsxStopChars.some(jsxStopChar => s.includes(jsxStopChar));

const escape = (s: string) => {
  if (!shouldBeEscaped(s)) {
    return s;
  }

  return `{\`${s}\`}`;
};

const preserveTrailingSpace = (s: string) => {
  let result = s;
  if (result.endsWith(' ')) {
    result = result.replace(/^(\S*)(\s*)$/, "$1{'$2'}");
  }

  if (result.startsWith(' ')) {
    result = result.replace(/^(\s*)(\S*)$/, "{'$1'}$2");
  }

  return result;
};

const formatTreeNode = (
  node: TreeNode,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  if (node.type === 'number') {
    return String(node.value);
  }

  if (node.type === 'array') {
    return node.value
      .map(v => formatTreeNode(v, inline, lvl, options))
      .join('\n');
  }

  if (node.type === 'string') {
    return node.value
      ? `${preserveTrailingSpace(escape(String(node.value)))}`
      : '';
  }

  if (node.type === 'ReactElement') {
    return formatReactElementNode(node, inline, lvl, options);
  }

  throw new TypeError(`Unknow format type "${node.type}"`);
};

export default formatTreeNode;
