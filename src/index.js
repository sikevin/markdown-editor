import React from 'react';
import {render} from 'react-dom';

// Styles
import './style/css/bootstrap.min.css';
import './index.css';

// JS Perso
import {sampleText} from './sampleText'

// Marked.js
import marked from 'marked';

class App extends React.Component{
	
	state = {
		text: sampleText
	};

	componentWillMount(){
		const localStorageText = localStorage.getItem('text');

		if(localStorageText){
			this.setState({'text': localStorageText});
		}
	};

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('text', nextState.text)
	};

	editText = (event) => {
		const text = event.target.value;
		this.setState({text});
	};

	renderText = (text) => {
		const renderText = marked(text, {sanitized: true});
		return { __html: renderText };
	};

	render() {
		return (
			<div className="container">
				<div className="row">

					<div className="col-sm-6">
						<textarea 
							rows="35" 
							className="form-control" 
							value={this.state.text} 
							onChange={(e) => this.editText(e)}
						>
							
						</textarea>
					</div>


					<div className="col-sm-6">
						<h1>Résultat</h1>
						<p dangerouslySetInnerHTML={this.renderText(this.state.text)}/>
					</div>

				</div>
			</div>
		)
	}
}

render(
	<App />,
	document.getElementById('root')
);