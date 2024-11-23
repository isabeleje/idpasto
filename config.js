export default {
	app: {
		name: "IDPasto",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8050",
		secret: "fc3c28fd6767d23ddc508714a7935468",
		language: "spanish",
		publicDir: "assets",
	},
	auth: {
		userTokenSecret: "d7acf0fA-1ax%W@9e995YY6Q!!0-5d3c5ab7faefdb7528f3",
		apiTokenSecret: "835de668$Xax%W!d37289B#Q-!07ec74071e996637d82766",
		jwtDuration: 30, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"sipap",
		type: "mysql",
		host: "localhost",
		username: "root",
		password: "",
		port: "",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"sipap@pasto.gov.co",
		password: "hijx orsz fmnj xtjr",
		senderemail:"sipap@pasto.gov.co",
		sendername:"Subsecretaría de Sistemas de Información",
		host: "smtp.gmail.com",
		secure: true,
		port: "465"
	},
	upload: {
		tempDir: "uploads/temp/",
		importdata: {
			filenameType: "timestamp",
			extensions: "csv",
			limit: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
		foto: {
			filenameType: "random",
			extensions: "jpg,png,jpeg",
			limit: "1",
			maxFileSize: "10",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "us-west-2",
		bucket: "",
	},
	
}