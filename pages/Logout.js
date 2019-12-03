import Router from "next/router";
import jsCookie from "js-cookie";

class Logout extends React.Component {
	constructor(props){
		super(props);

		this.state = {username: "", password: ""};
		jsCookie.remove("username");
		jsCookie.remove("zip");
	}

	componentDidMount(){
		Router.replace("/Search");
	}
	render() {
		const that = this;
		return(
			<div>Hi</div>
			)
	}
}

export default Logout;
