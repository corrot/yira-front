import * as React from 'react';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { Tooltip, Button } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownload';

const MyDoc = ({ data: { title, description } }) => {
	return (
		<Document>
			<Page>
				<View fixed>
					<Text>{title}</Text>
					<Text>{description}</Text>
				</View>
			</Page>
		</Document>
	);
};

export default data => (
	<div>
		<PDFDownloadLink document={<MyDoc data={data} />} fileName={data.id}>
			{({ blob, url, loading, error }) => {
				// console.log(blob, url, loading, error);
				if (!loading) window.open(url, '_blank');
				return (
					<Button disabled={loading} type="button" color="primary">
						<Tooltip title="Download">
							<DownloadIcon />
						</Tooltip>
					</Button>
				);
			}}
		</PDFDownloadLink>
	</div>
);
