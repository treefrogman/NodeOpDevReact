import TextBubble from './TextBubble';

export default function Nøde(props) {
	const { title, ...other} = props;
	return <TextBubble className="NødeTitle" text={title} {...other} padV="1" padH="5" ry="4" y="-10" />;
}

