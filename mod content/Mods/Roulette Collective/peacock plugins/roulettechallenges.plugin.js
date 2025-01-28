"use strict"
var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __copyProps = (to, from, except, desc) => {
	if ((from && typeof from === "object") || typeof from === "function") {
		for (let key of __getOwnPropNames(from))
			if (!__hasOwnProp.call(to, key) && key !== except)
				__defProp(to, key, {
					get: () => from[key],
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				})
	}
	return to
}
const { PEACOCKVER, PEACOCKVERSTRING } = require("@peacockproject/core/utils")
var __toESM = (mod, isNodeMode, target) => (
	(target = mod != null ? __create(__getProtoOf(mod)) : {}),
	__copyProps(
		// If the importer is in node compatibility mode or this is not an ESM
		// file that has been converted to a CommonJS file using a Babel-
		// compatible transform (i.e. "__esModule" has not been set), then set
		// "default" to the CommonJS "module.exports" for node compatibility.
		isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
		mod
	)
)

// plugins/challengesexample.plugin.ts
var import_loggingInterop = require("@peacockproject/core/loggingInterop")
var path = __toESM(require("path"))
function initPlugin(controller) {
	if (PEACOCKVERSTRING !== "8.0.0-alpha.3") {
		return
	}
	const groupName = "roulette-challenge-pack"
	const version = "h3"
	const location = "GLOBAL_ROULETTE_CHALLENGES"
	const cateogryLoc = "UI_MENU_PAGE_PROFILE_CHALLENGES_ROULETTE"
	const globalChallenges = [
		{
			Id: "3042b6f5-5610-4439-9b1e-b56317918df9",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_1_TITLE",
			ImageName: "images/contracts/Roulette/rt1.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_1_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["PROP_WATER_CAN"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90001,
			Xp: 1000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 1
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractTypes: ["bulletdancer"]
			}
		},
		{
			Id: "e33c2de8-c9b5-4a7a-a8ff-86440ee1d84b",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_2_TITLE",
			ImageName: "images/contracts/Roulette/rt2.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_2_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["PROP_DEVICE_EVERGREEN_OILSPILL_CANISTER"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90002,
			Xp: 2000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 2
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractTypes: ["bulletdancer"]
			}
		},
		{
			Id: "d8989138-e05d-449b-8dfe-b51f746ab96c",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_3_TITLE",
			ImageName: "images/contracts/Roulette/rt3.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_3_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["PROP_PROPANE_FLASK"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90003,
			Xp: 3000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 3
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractTypes: ["bulletdancer"]
			}
		},
		{
			Id: "16f5bbb9-94f2-427c-a807-6a8a8cdaa66f",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_5_TITLE",
			ImageName: "images/contracts/Roulette/rt4.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_5_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["PROP_DEVICE_PLAYING_CARD_HACKER"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90004,
			Xp: 5000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 5
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractTypes: ["bulletdancer"]
			}
		},
		{
			Id: "16f5bbc9-94f2-427c-a807-6a8a8cdaa66f",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_10_TITLE",
			ImageName: "images/contracts/Roulette/rt5.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_10_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["PROP_DEVICE_BREACHING_CHIP"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90005,
			Xp: 10000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 10
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractTypes: ["bulletdancer"]
			}
		},
		{
			Id: "b91e9605-c7fc-4686-ade9-183f5bf2efba",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_15_TITLE",
			ImageName: "images/contracts/Roulette/rt6.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_15_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["FIREARMS_PISTOL_GOLDEN_GUN"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90006,
			Xp: 15000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 15
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractTypes: ["bulletdancer"]
			}
		},
		{
			Id: "f2f09ec3-5d03-4249-a233-b7693e10711e",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_20_TITLE",
			ImageName: "images/contracts/Roulette/rt7.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_20_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["TOKEN_OUTFIT_HERO_MONTE_CARLO"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90007,
			Xp: 20000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 20
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractTypes: ["bulletdancer"]
			}
		},
		{
			Id: "9463b80b-3b80-4d9a-b261-728c908fbb80",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_1D_TITLE",
			ImageName: "images/contracts/Roulette/rdt1.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_1D_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["ROULETTE_DART_RIFLE"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90008,
			Xp: 10000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 1
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractIds: ["218313f3-2b5e-4a8b-b916-ab5862b7874f"]
			}
		},
		{
			Id: "75651627-73b3-418f-ad87-8ae51dd04bd4",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_2D_TITLE",
			ImageName: "images/contracts/Roulette/rdt2.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_2D_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["FIREARMS_HERO_PISTOL_ICER"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90009,
			Xp: 10000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 2
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractIds: ["218313f3-2b5e-4a8b-b916-ab5862b7874f"]
			}
		},
		{
			Id: "150cb41c-2a09-4140-8ab4-a10971ef6a6d",
			Name: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_3D_TITLE",
			ImageName: "images/contracts/Roulette/rdt3.jpg",
			Description: "UI_CHALLENGES_GLOBAL_ROULETTE_CHALLENGE_3D_DESC",
			Rewards: {
				MasteryXP: 0
			},
			Drops: ["TOKEN_OUTFIT_HERO_DAILY_ROULETTE_SUIT"],
			IsPlayable: false,
			IsLocked: false,
			HideProgression: false,
			CategoryName: cateogryLoc,
			Icon: "challenge_category_feats",
			LocationId: "",
			ParentLocationId: "",
			Type: "global",
			// Make sure to mark is a global type
			DifficultyLevels: [],
			OrderIndex: 90010,
			Xp: 10000,
			XpModifier: {},
			RuntimeType: "Hit",
			Definition: {
				// Since it's an example, challenge will be finished if you kill anyone.
				Scope: "hit",
				Constants: {
					Goal: 3
				},
				Context: {
					Count: 0
				},
				ContextListeners: {
					Count: {
						type: "challengecounter",
						count: "$.Count",
						total: "$.Goal"
					}
				},
				States: {
					Start: {
						ContractEnd: [
							{
								Actions: {
									$inc: "Count"
								}
							},
							{
								Condition: {
									$eq: ["$.Count", "$.Goal"]
								},
								Transition: "Success"
							}
						]
					}
				}
			},
			// Those don't really do anything, but it's a good idea to populate the tags.
			Tags: ["story", "hard", groupName],
			InclusionData: {
				ContractIds: ["218313f3-2b5e-4a8b-b916-ab5862b7874f"]
			}
		}
	]
	const locationChallenges = []
	const group = {
		Name: cateogryLoc,
		// Image will be shown in the challenges menu when all challenges are complete
		Image: "images/Contracts/roulette/roulettechallengepack.jpg",
		Icon: "challenge_category_feats",
		CategoryId: groupName,
		Description: "Example of creating custom challenges",
		// OrderIndex dictates the position of the group in the menu.
		// Usually should be above 6 to be shown after all other built-in groups.
		// Can be a floating point value.
		OrderIndex: 7,
		Challenges: [...locationChallenges, ...globalChallenges]
	}
	controller.challengeService.challengePacks.set(group.CategoryId, {
		Name: group.Name,
		Description: group.Description,
		GameVersions: [version],
		Image: group.Image,
		Icon: "challenge_category_feats"
	})
	controller.challengeService.registerGroup(group, location, version)
	controller.challengeService.registerChallengeList(globalChallenges, group.CategoryId, location, version)
	controller.challengeService.globalMergeGroups.set(groupName, {
		gameVersions: ["h3"],
		groupId: groupName,
		location,
		// The `allLocations` flag is optional, but will enforce presence of global group everywhere,
		// regardless of this group challenges presence in the location.
		// See documentation on `allLocations` flag for more details and gotchas.
		allLocations: true
	})
	for (const challenge of locationChallenges) {
		if (!controller.challengeService.hasGroup(groupName, challenge.ParentLocationId, version)) {
			controller.challengeService.registerGroup(group, challenge.ParentLocationId, version)
		}
		controller.challengeService.registerChallenge(challenge, groupName, challenge.ParentLocationId, version)
	}
	;(0, import_loggingInterop.log)(import_loggingInterop.LogLevel.INFO, "[Roulette] Challenges added.")
	if (!controller.smf.modIsInstalled("Peacock.SamplePlugins_Challenges")) {
		return
	}
	const pluginPath = controller.smf.lastDeploy.lastServerSideStates?.peacockPlugins?.find?.((p) =>
		p.includes("challengesexample.plugin.js")
	)
	if (!pluginPath) {
		return
	}
	const modLocation = path.dirname(pluginPath)
	modLocation
}
module.exports = initPlugin
