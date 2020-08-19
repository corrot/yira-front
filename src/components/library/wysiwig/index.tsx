import React, { useState } from 'react';
import ReactQuill from 'react-quill';

interface IWysiwigProps {}

const modules = {
	toolbar: [
		[
			{ header: '1' },
			{ header: '2' }
			// { font: [] }
		],
		// [{ size: [] }],
		[
			'bold' // 'italic', 'underline', 'strike', 'blockquote'
		],
		// [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		[
			// 'link',
			'image'
			// 'video'
		],
		['clean']
	],
	clipboard: {
		matchVisual: false
	}
};

const formats = [
	'header',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'video'
];

const placeholder = 'Type description here...';

const WYSYWIG = (props: IWysiwigProps) => {
	const [text, setText] = useState('');

	const handleChange = value => {
		setText(value);
	};

	return (
		<ReactQuill
			modules={modules}
			formats={formats}
			placeholder={placeholder}
			theme="snow"
			value={text}
			onChange={e => handleChange(e.target.value)}
		/>
	);
};

export default WYSYWIG;

export const renderQuill = ({ input }) => {
	return (
		<ReactQuill
			{...input}
			modules={modules}
			formats={formats}
			theme="snow"
			onChange={(newValue, delta, source) => {
				if (source === 'user') {
					input.onChange(newValue);
				}
			}}
			onBlur={(range, source, quill) => {
				input.onBlur(quill.getHTML());
			}}
		/>
	);
};
