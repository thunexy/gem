import axios from "axios";
import env from "../../../env.js";

const clientConfig = {
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		terminalId: env().terminalId
	}
};

let axiosInstance = axios.create(clientConfig);

export { axiosInstance };
