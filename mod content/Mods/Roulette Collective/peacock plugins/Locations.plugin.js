const loggingInterop_1 = require("@peacockproject/core/loggingInterop")
const { PEACOCKVER, PEACOCKVERSTRING } = require("@peacockproject/core/utils")
module.exports = function test(controller) {
	if (PEACOCKVERSTRING !== "8.0.0-alpha.3") {
		return
	}
	;(0, loggingInterop_1.log)(loggingInterop_1.LogLevel.INFO, "[Roulette] Custom Locations Added.")
	DirectorCC = {
		Data: {
			Objectives: [],
			Bricks: ["assembly:/_PRO/Scenes/Missions/Paris/_scene_ts6_blueblazer.brick"],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/contracts/novikov_and_magolis/tile.jpg",
			Location: "LOCATION_THEDIRECTOR",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_PRO/Scenes/Missions/Paris/_scene_paris.entity",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "b93a19b0-0590-4e6e-87d0-a10571dcbafb",
			CreationTimestamp: "2014-10-28T09:41:25.473Z",
			RequiredUnlockable: "ACCESS_HIT_PEACOCK",
			CodeName_Hint: "Create contract paris",
			Type: "creation",
			Release: "1.0.x",
			Entitlements: ["H3_SARAJEVO_SIX"],
			LastUpdate: "2021-04-20T12:24:57.5812284Z",
			PublicId: "002586348147"
		},
		UserData: {}
	}
	var EnforcerCC = {
		Data: {
			Objectives: [],
			Bricks: ["assembly:/_PRO/Scenes/Missions/CoastalTown/mission_ts6_mimosa.brick"],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/contracts/surveillance_portofino/tile.jpg",
			Location: "LOCATION_THEENFORCER",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_PRO/Scenes/Missions/CoastalTown/_scene_octopus.entity",
			RequiredUnlockable: "ACCESS_HIT_OCTOPUS",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "eee0280b-f375-4d33-ae97-aa9371530d80",
			CreationTimestamp: "2014-10-28T09:41:25.473Z",
			CodeName_Hint: "Create contract Sapienza Octopus",
			Type: "creation",
			Release: "1.1.x",
			Entitlements: ["H3_SARAJEVO_SIX"],
			LastUpdate: "2021-04-20T12:24:57.6030219Z",
			PublicId: "003534627147"
		},
		UserData: {}
	}
	var ExtractorCC = {
		Data: {
			Objectives: [],
			Bricks: ["assembly:/_pro/scenes/missions/marrakesh/mission_marrakesh_ts6_ginfizz.brick"],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/contracts/spider/tile.jpg",
			Location: "LOCATION_THEEXTRACTOR",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_pro/scenes/missions/marrakesh/_scene_spider.entity",
			RequiredUnlockable: "ACCESS_HIT_SPIDER",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "00abc882-07d1-461f-a31b-0f71a67b9422",
			CreationTimestamp: "2014-10-28T09:41:25.473Z",
			CodeName_Hint: "Create contract Marrakesh Spider",
			Type: "creation",
			Release: "1.2.x",
			Entitlements: ["H3_SARAJEVO_SIX"],
			LastUpdate: "2021-04-20T12:24:57.6234537Z",
			PublicId: "006234089247"
		},
		UserData: {}
	}
	var VeteranCC = {
		Data: {
			Objectives: [],
			Bricks: ["assembly:/_pro/scenes/missions/bangkok/mission_ts6_gimlet.brick"],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/locations/LOCATION_BANGKOK/tile.jpg",
			Location: "LOCATION_THEVETERAN",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_PRO/Scenes/Missions/Bangkok/_scene_tiger.entity",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "53b2f355-2114-4ff8-8cad-2e12bcd6c5aa",
			CreationTimestamp: "2014-10-28T09:41:25.473Z",
			CodeName_Hint: "Create contract Bangkok Tiger",
			Type: "creation",
			Release: "1.3.x",
			Entitlements: ["H3_SARAJEVO_SIX"],
			LastUpdate: "2021-04-20T12:24:57.6440148Z",
			PublicId: "008504553047"
		},
		UserData: {}
	}
	var MercCC = {
		Data: {
			Objectives: [],
			Bricks: ["assembly:/_PRO/Scenes/Missions/Colorado_2/_scene_ts6_blackrussian.brick"],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/locations/LOCATION_COLORADO/tile.jpg",
			Location: "LOCATION_THEMERCENARY",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			RequiredUnlockable: "ACCESS_HIT_BULL",
			ScenePath: "assembly:/_PRO/Scenes/Missions/Colorado_2/_scene_bull.entity",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "546a92f7-d09e-4873-afb9-5ef6e2677692",
			CreationTimestamp: "2014-10-28T09:41:25.473Z",
			CodeName_Hint: "Create contract Colorado Bull",
			Type: "creation",
			Release: "1.5.x",
			Entitlements: ["H3_SARAJEVO_SIX"],
			LastUpdate: "2021-04-20T12:24:57.6642486Z",
			PublicId: "009184496347"
		},
		UserData: {}
	}
	var ControllerCC = {
		Data: {
			Objectives: [],
			Bricks: ["assembly:/_PRO/Scenes/Missions/Hokkaido/mission_hokkaido_ts6_seabreeze.brick"],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/contracts/snowcrane/tile.jpg",
			Location: "LOCATION_THECONTROLLER",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_PRO/Scenes/Missions/Hokkaido/_scene_snowcrane.entity",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "b9fdbf33-944c-41fa-83b3-f8e30a2ecc4d",
			CreationTimestamp: "2014-10-28T09:41:25.473Z",
			CodeName_Hint: "Create contract Hokkaido Snowcrane",
			Type: "creation",
			Release: "1.6.x",
			Entitlements: ["H3_SARAJEVO_SIX"],
			LastUpdate: "2021-04-20T12:24:57.6836556Z",
			PublicId: "010666556247"
		},
		UserData: {}
	}
	var MiamiCC = {
		Data: {
			Objectives: [],
			Bricks: [],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/locations/LOCATION_MIAMI/tile.jpg",
			Location: "LOCATION_MIAMI_COTTONMOUTH",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_pro/scenes/missions/miami/scene_cottonmouth.entity",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "18b9ae32-183a-408f-afd5-b7005b76240b",
			CreationTimestamp: "2014-10-28T09:41:25.473Z",
			CodeName_Hint: "Create contract Miami Flamingo",
			Type: "creation",
			Release: "2.0.x",
			Entitlements: ["H2_LEGACY_EXPANSION"],
			LastUpdate: "2021-04-15T12:40:17.005166Z",
			PublicId: "011861443447"
		},
		UserData: {}
	}
	var ColumbiaCC = {
		Data: {
			Objectives: [],
			Bricks: [],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/locations/LOCATION_COLOMBIA/tile.jpg",
			Location: "LOCATION_COLOMBIA_ANACONDA",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_pro/scenes/missions/colombia/scene_anaconda.entity",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "0a907930-8951-45ff-9161-5ba30353e26a",
			CreationTimestamp: "2014-10-28T09:41:25.473Z",
			CodeName_Hint: "Create contract Colombia Hippo",
			Type: "creation",
			Release: "2.0.x",
			Entitlements: ["H2_LEGACY_STANDARD"],
			LastUpdate: "2021-06-01T12:15:38.4549466Z",
			PublicId: "012802063247"
		},
		UserData: {}
	}
	var mumbaiCC = {
		Data: {
			Objectives: [],
			Bricks: [],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/locations/LOCATION_MUMBAI/tile.jpg",
			Location: "LOCATION_MUMBAI_KINGCOBRA",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_pro/scenes/missions/mumbai/scene_kingcobra.entity",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "5e78274e-d329-4f76-87dd-2fd060683f71",
			CreationTimestamp: "2017-02-23T13:48:25.473Z",
			CodeName_Hint: "Create contract Mumbai Mongoose",
			Type: "creation",
			Release: "2.0.x",
			Entitlements: ["H2_LEGACY_EXPANSION"],
			LastUpdate: "2021-06-01T12:15:38.4787513Z",
			PublicId: "013090926647"
		},
		UserData: {}
	}
	var WhittleCC = {
		Data: {
			Objectives: [],
			Bricks: [],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/locations/Location_northamerica/Tile.jpg",
			Location: "LOCATION_NORTHAMERICA_GARTERSNAKE",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_pro/scenes/missions/skunk/scene_gartersnake.entity",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "36eac4fa-8377-44f0-b0ba-94f407c9aa01",
			CreationTimestamp: "2018-04-30T13:48:25.473Z",
			CodeName_Hint: "Create contract Suburbia Skunk",
			Type: "creation",
			Release: "2.0.x",
			Entitlements: ["H2_LEGACY_EXPANSION"],
			LastUpdate: "2021-06-07T12:55:56.9119668Z",
			PublicId: "022933650047"
		},
		UserData: {}
	}
	var WolvCC = {
		Data: {
			Objectives: [],
			Bricks: [],
			GameChangers: [
				"61a618c2-1cfc-46fa-846b-467de76042d6",
				"b48bb7f9-b630-48cb-a816-720ed7959319",
				"1f8f0b8b-1f65-4d6c-a2f4-fc8adffa394a",
				"9673f602-3b2a-4bd3-94b3-b3b311b7bc7e",
				"a77cf01e-ab02-4b1c-a4bd-a37fb8be1114",
				"008d2eb9-c1c8-44e0-a636-ccca63629f3c",
				"1efef5c0-7381-4e22-ac04-ffbd0822cc96",
				"f96e94b7-1c0e-49c9-9332-07346a955fd2",
				"95690829-7da4-4225-a087-08918cccf120"
			]
		},
		Metadata: {
			IsLocked: false,
			CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
			IsPublished: true,
			TileImage: "images/locations/LOCATION_TRAPPED/trapped_background.jpg",
			Location: "LOCATION_TRAPPED_WOLVERINE",
			Title: "UI_CONTRACT_CREATE_CONTRACT_TITLE",
			ScenePath: "assembly:/_PRO/Scenes/Missions/trapped/scene_wolverine.entity",
			Description: "UI_CONTRACT_CREATE_CONTRACT_DESC",
			Id: "545869f8-043e-412c-8c24-310f6f55f5be",
			CreationTimestamp: "2018-04-30T13:48:25.473Z",
			CodeName_Hint: "Create contract Suburbia Skunk",
			Type: "creation",
			Release: "2.0.x",
			Entitlements: ["H2_LEGACY_STANDARD"],
			LastUpdate: "2021-06-07T12:55:56.9119668Z",
			PublicId: "022933650047"
		},
		UserData: {}
	}
	controller.addMission(DirectorCC)
	controller.addMission(EnforcerCC)
	controller.addMission(ExtractorCC)
	controller.addMission(VeteranCC)
	controller.addMission(MercCC)
	controller.addMission(ControllerCC)
	controller.addMission(MiamiCC)
	controller.addMission(ColumbiaCC)
	controller.addMission(mumbaiCC)
	controller.addMission(WhittleCC)
	controller.addMission(WolvCC)
	var LOCATION_THEDIRECTOR = "LOCATION_THEDIRECTOR"
	var LOCATION_THEENFORCER = "LOCATION_THEENFORCER"
	var LOCATION_THEEXTRACTOR = "LOCATION_THEEXTRACTOR"
	var LOCATION_THEVETERAN = "LOCATION_THEVETERAN"
	var LOCATION_THEMERCENARY = "LOCATION_THEMERCENARY"
	var LOCATION_THECONTROLLER = "LOCATION_THECONTROLLER"
	var newEntry = {
		Id: "LOCATION_THEDIRECTOR",
		Type: "location",
		Subtype: "sublocation",
		GameAsset: null,
		ImageId: "",
		RMTPrice: -1,
		GamePrice: -1,
		IsPurchasable: false,
		IsPublished: true,
		IsDroppable: false,
		Capabilities: [],
		Qualities: {},
		Properties: {
			ParentLocation: "LOCATION_PARENT_PARIS",
			Quality: "",
			Icon: "images/contracts/sarajevosix/orbis001_blueblazer/title.jpg",
			DlcImage: "images/livetile/dlc/tile_hitman3.jpg",
			DlcName: "GAME_STORE_METADATA_S3_GAME_TITLE",
			Background: "images/locations/LOCATION_PARIS/background.jpg",
			GameChangers: [],
			Order: 15,
			Season: 1,
			ProgressionKey: "LOCATION_PARIS",
			CreateContractId: "b93a19b0-0590-4e6e-87d0-a10571dcbafb",
			RequiredResources: ["[assembly:/_PRO/Scenes/Missions/Paris/_scene_paris.entity].entitytemplate"],
			Entitlements: ["H3_SARAJEVO_SIX"]
		},
		Guid: "dd0c29f7-ae80-4c4e-ac85-4ec85c075fcc",
		Rarity: null,
		DisplayNameLocKey: "UI_LOCATION_PARIS_NAME_S6"
	}
	var EnforcerLocationData = {
		Id: "LOCATION_THEENFORCER",
		Type: "location",
		Subtype: "sublocation",
		GameAsset: null,
		ImageId: "",
		RMTPrice: -1,
		GamePrice: -1,
		IsPurchasable: false,
		IsPublished: true,
		IsDroppable: false,
		Capabilities: [],
		Qualities: {},
		Properties: {
			ParentLocation: "LOCATION_PARENT_COASTALTOWN",
			Background: "images/locations/LOCATION_COASTALTOWN/background.jpg",
			Icon: "images/contracts/sarajevosix/Orbis002_Mimosa/Title.jpg",
			LockedIcon: "images/locations/LOCATION_COASTALTOWN/tile_unreleased.jpg",
			DlcImage: "images/livetile/dlc/tile_hitman3.jpg",
			DlcName: "GAME_STORE_METADATA_S3_GAME_TITLE",
			IsLocked: false,
			GameChangers: [],
			Order: 20,
			ProgressionKey: "LOCATION_PARENT_COASTALTOWN",
			CreateContractId: "eee0280b-f375-4d33-ae97-aa9371530d80",
			Season: 1,
			RequiredResources: ["[assembly:/_PRO/Scenes/Missions/CoastalTown/_scene_octopus.entity].entitytemplate"],
			Entitlements: ["H3_SARAJEVO_SIX"]
		},
		Guid: "92262338-86fc-44b5-ae58-2bf87d7c6ce7",
		Rarity: null,
		DisplayNameLocKey: "UI_LOCATION_COASTALTOWN_NAME"
	}
	var ExtractorLocationData = {
		Id: "LOCATION_THEEXTRACTOR",
		Type: "location",
		Subtype: "sublocation",
		GameAsset: null,
		ImageId: "",
		RMTPrice: -1,
		GamePrice: -1,
		IsPurchasable: false,
		IsPublished: true,
		IsDroppable: false,
		Capabilities: [],
		Qualities: {},
		Properties: {
			ParentLocation: "LOCATION_PARENT_MARRAKECH",
			Background: "images/locations/LOCATION_MARRAKECH/background.jpg",
			Icon: "images/contracts/sarajevosix/Orbis003_GinFizz/Title.jpg",
			LockedIcon: "images/locations/location_marrakech/tile_unreleased.jpg",
			DlcImage: "images/livetile/dlc/tile_hitman3.jpg",
			DlcName: "GAME_STORE_METADATA_S3_GAME_TITLE",
			IsLocked: false,
			Order: 35,
			ProgressionKey: "LOCATION_MARRAKECH",
			CreateContractId: "00abc882-07d1-461f-a31b-0f71a67b9422",
			Season: 1,
			RequiredResources: ["[assembly:/_PRO/Scenes/Missions/Marrakesh/_Scene_Mission_Spider.entity].entitytemplate"],
			Entitlements: ["H3_SARAJEVO_SIX"]
		},
		Guid: "4ed896aa-31fc-457f-a1d6-f70814c5a354",
		Rarity: null,
		DisplayNameLocKey: "UI_LOCATION_MARRAKECH_NAME"
	}
	var VeteranLocationData = {
		Id: "LOCATION_THEVETERAN",
		Type: "location",
		Subtype: "sublocation",
		GameAsset: null,
		ImageId: "",
		RMTPrice: -1,
		GamePrice: -1,
		IsPurchasable: false,
		IsPublished: true,
		IsDroppable: false,
		Capabilities: [],
		Qualities: {},
		Properties: {
			ParentLocation: "LOCATION_PARENT_BANGKOK",
			Icon: "images/contracts/sarajevosix/Orbis004_Gimlet/Title.jpg",
			LockedIcon: "images/locations/LOCATION_BANGKOK/tile_unreleased.jpg",
			DlcImage: "images/livetile/dlc/tile_hitman3.jpg",
			DlcName: "GAME_STORE_METADATA_S3_GAME_TITLE",
			IsLocked: false,
			UpcomingContent: false,
			UpcomingKey: "UI_MENU_LIVETILE_CONTENT_UPCOMING_HEADLINE",
			Background: "images/locations/LOCATION_BANGKOK/background.jpg",
			Order: 45,
			Season: 1,
			ProgressionKey: "LOCATION_BANGKOK",
			CreateContractId: "53b2f355-2114-4ff8-8cad-2e12bcd6c5aa",
			RequiredResources: ["[assembly:/_PRO/Scenes/Missions/Bangkok/_Scene_Mission_Tiger.entity].entitytemplate"],
			Entitlements: ["H3_SARAJEVO_SIX"]
		},
		Guid: "376fc88a-b65c-4285-b7db-4778f75902a6",
		Rarity: null,
		DisplayNameLocKey: "UI_LOCATION_BANGKOK_NAME"
	}
	var MercLocationData = {
		Id: "LOCATION_THEMERCENARY",
		Type: "location",
		Subtype: "sublocation",
		GameAsset: null,
		ImageId: "",
		RMTPrice: -1,
		GamePrice: -1,
		IsPurchasable: false,
		IsPublished: true,
		IsDroppable: false,
		Capabilities: [],
		Qualities: {},
		Properties: {
			ParentLocation: "LOCATION_PARENT_COLORADO",
			Icon: "images/contracts/sarajevosix/Orbis005_BlackRussian/Title.jpg",
			DlcImage: "images/livetile/dlc/tile_hitman3.jpg",
			DlcName: "GAME_STORE_METADATA_S3_GAME_TITLE",
			LockedIcon: "images/locations/LOCATION_COLORADO/tile_unreleased.jpg",
			IsLocked: false,
			UpcomingContent: false,
			UpcomingKey: "UI_MENU_LIVETILE_CONTENT_UPCOMING_HEADLINE",
			Background: "images/locations/LOCATION_COLORADO/background.jpg",
			Order: 55,
			Season: 1,
			ProgressionKey: "LOCATION_COLORADO",
			CreateContractId: "546a92f7-d09e-4873-afb9-5ef6e2677692",
			RequiredResources: ["[assembly:/_PRO/Scenes/Missions/Colorado_2/_scene_mission_bull.entity].entitytemplate"],
			Entitlements: ["H1_LEGACY_STANDARD"]
		},
		Guid: "7dd2fa8c-6d83-48c8-9092-896b7c6ed888",
		Rarity: null,
		DisplayNameLocKey: "UI_LOCATION_COLORADO_NAME"
	}

	var untouchLocationData = {
		Id: "LOCATION_UNTOUCHED",
		Type: "location",
		Subtype: "sublocation",
		GameAsset: null,
		ImageId: "",
		RMTPrice: -1,
		GamePrice: -1,
		IsPurchasable: false,
		IsPublished: true,
		IsDroppable: false,
		Capabilities: [],
		Qualities: {},
		Properties: {
			ParentLocation: "LOCATION_PARENT_TRAPPED",
			Icon: "images/locations/LOCATION_TRAPPED/trapped_background.jpg",
			Background: "images/locations/LOCATION_TRAPPED/trapped_background.jpg",
			DlcImage: "images/livetile/dlc/tile_hitman3.jpg",
			DlcName: "GAME_STORE_METADATA_S3_GAME_TITLE",
			LockedIcon: "images/locations/LOCATION_TRAPPED/trapped_background.jpg",
			IsLocked: false,
			UpcomingContent: false,
			UpcomingKey: "UI_MENU_LIVETILE_CONTENT_UPCOMING_HEADLINE",
			Order: 100,
			Season: 3,
			ProgressionKey: "LOCATION_TRAPPED",
			CreateContractId: "545869f8-043e-412c-8c24-310f6f55f5be",
			RequiredResources: ["[assembly:/_pro/scenes/missions/Trapped/scene_wolverine.entity].entitytemplate"],
			Entitlements: ["LOCATION_TRAPPED"]
		},
		Guid: "7dd2fa8c-6d83-48c8-9092-896b7c6ed688",
		Rarity: null
	}
	var controllerlocationdata = {
		Id: "LOCATION_THECONTROLLER",
		Type: "location",
		Subtype: "sublocation",
		GameAsset: null,
		ImageId: "",
		RMTPrice: -1,
		GamePrice: -1,
		IsPurchasable: false,
		IsPublished: true,
		IsDroppable: false,
		Capabilities: [],
		Qualities: {},
		Properties: {
			ParentLocation: "LOCATION_PARENT_HOKKAIDO",
			Icon: "images/contracts/sarajevosix/Orbis006_SeaBreeze/Title.jpg",
			LockedIcon: "images/locations/LOCATION_HOKKAIDO/tile_unreleased.jpg",
			DlcImage: "images/livetile/dlc/tile_hitman3.jpg",
			DlcName: "GAME_STORE_METADATA_S3_GAME_TITLE",
			IsLocked: false,
			UpcomingContent: false,
			UpcomingKey: "UI_MENU_LIVETILE_CONTENT_UPCOMING_HEADLINE",
			Background: "images/locations/LOCATION_HOKKAIDO/background.jpg",
			Order: 65,
			Season: 1,
			LimitedLoadout: true,
			NormalLoadoutUnlock: "LOADOUT_UNLOCK_HOKKAIDO",
			ProgressionKey: "LOCATION_HOKKAIDO",
			CreateContractId: "b9fdbf33-944c-41fa-83b3-f8e30a2ecc4d",
			RequiredResources: ["[assembly:/_PRO/Scenes/Missions/Hokkaido/_Scene_Mission_SnowCrane.entity].entitytemplate"],
			Entitlements: ["H3_SARAJEVO_SIX"]
		},
		Guid: "0519881b-7b32-4c3c-a915-68388f4035b8",
		Rarity: null,
		DisplayNameLocKey: "UI_LOCATION_HOKKAIDO_NAME"
	}
	controller.configManager.configs.LocationsData.children["LOCATION_UNTOUCHED"] = untouchLocationData
	controller.configManager.configs.LocationsData.children[LOCATION_THEDIRECTOR] = newEntry
	controller.configManager.configs.LocationsData.children[LOCATION_THEENFORCER] = EnforcerLocationData
	controller.configManager.configs.LocationsData.children[LOCATION_THEEXTRACTOR] = ExtractorLocationData
	controller.configManager.configs.LocationsData.children[LOCATION_THEVETERAN] = VeteranLocationData
	controller.configManager.configs.LocationsData.children[LOCATION_THEMERCENARY] = MercLocationData
	controller.configManager.configs.LocationsData.children[LOCATION_THECONTROLLER] = controllerlocationdata
	controller.configManager.configs.LocationsData.children["LOCATION_MIAMI_COTTONMOUTH"].Properties.CreateContractId =
		"18b9ae32-183a-408f-afd5-b7005b76240b"
	controller.configManager.configs.LocationsData.children["LOCATION_COLOMBIA_ANACONDA"].Properties.CreateContractId =
		"0a907930-8951-45ff-9161-5ba30353e26a"
	controller.configManager.configs.LocationsData.children["LOCATION_MUMBAI_KINGCOBRA"].Properties.CreateContractId =
		"5e78274e-d329-4f76-87dd-2fd060683f71"
	controller.configManager.configs.LocationsData.children[
		"LOCATION_NORTHAMERICA_GARTERSNAKE"
	].Properties.CreateContractId = "36eac4fa-8377-44f0-b0ba-94f407c9aa01"
}
