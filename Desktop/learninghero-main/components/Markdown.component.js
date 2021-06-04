import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  plugins: [
    RemarkMathPlugin
  ],
  renderers: {
    ...props.renderers,
    math: ({ value }) => <BlockMath styles={{color:"blue"}}>{value}</BlockMath>,
    inlineMath: ({ value }) => <InlineMath styles={{color:"blue"}}>{value}</InlineMath>
  }
});

const Markdown = (props) => <ReactMarkdown styles={{color:"blue"}} {..._mapProps(props)} />;

export default Markdown;