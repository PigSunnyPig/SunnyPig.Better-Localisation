const { log, LogLevel } = require("@peacockproject/core/loggingInterop")
const zlib = require("zlib")
const { Buffer } = require("buffer")
const randomUUID = require("crypto").randomUUID
var import_flags = require("@peacockproject/core/flags")
const { PEACOCKVER, PEACOCKVERSTRING } = require("@peacockproject/core/utils")
var RRAdditiveModifiersFlagSectionKey = "randomroulette"
function decompress(input) {
	return JSON.parse(zlib.brotliDecompressSync(Buffer.from(input, "base64")).toString())
}
xorshift = (t) => {
	let e = t
	return (e ^= e << 13), (e ^= e >> 17), (e ^= e << 5), e >>> 0
}
const getRandomIntWithSeed = (t, e, r) => {
	const n = xorshift(r),
		s = new MersenneTwister(n).random() / 4294967295
	return Math.floor(s * (e - t + 1)) + t
}

class MersenneTwister {
	constructor(t) {
		;(this.N = 624), (this.mt = new Array(this.N)), (this.index = 0), (this.mt[0] = t >>> 0)
		for (let t = 1; t < this.N; t++) this.mt[t] = (1812433253 * (this.mt[t - 1] ^ (this.mt[t - 1] >>> 30)) + t) >>> 0
	}
	random() {
		0 === this.index && this.generateNumbers()
		let t = this.mt[this.index]
		return (
			(t ^= t >>> 11),
			(t ^= (t << 7) & 2636928640),
			(t ^= (t << 15) & 4022730752),
			(t ^= t >>> 18),
			(this.index = (this.index + 1) % this.N),
			t >>> 0
		)
	}
	generateNumbers() {
		for (let t = 0; t < this.N; t++) {
			let e = (2147483648 & this.mt[t]) + (2147483647 & this.mt[(t + 1) % this.N])
			;(this.mt[t] = this.mt[(t + 397) % this.N] ^ (e >>> 1)), e % 2 != 0 && (this.mt[t] ^= 2567483615)
		}
	}
}

module.exports = function ContractSearch(controller) {
	if (PEACOCKVERSTRING !== "8.0.0-alpha.3") {
		return
	}
	let seed = controller.transferseed
	controller.hooks.getSearchResults.tap("ContractSearchResults", async (parameters, ids) => {
		if (import_flags.getFlag(`${RRAdditiveModifiersFlagSectionKey}.contractgen`) === "true") {
			const contractId = randomUUID()
			controller.transfercontractid = contractId
			seed = controller.transferseed
			const defaultMissionPool = []
			const selectedMissionPool = []
			const rouletteFilters = []
			const defaultRouletteFilters = ["specificDisguises", "specificMelee", "specificFirearms", "specificAccidents"]
			let seedimagepath = controller.transferseedimagepath
			let seedtitle = controller.transferseedtitle
			let plaintextseedfordisplay = controller.transferdisplayseed
			let SeedGameChanger = {
				"270e1adc-06d2-4680-b7c7-53c2599074b5": {
					Name: seedtitle,
					Description: plaintextseedfordisplay,
					Icon: "images/Contracts/RandomRoulette/RR_LOGO.jpg",
					IsHidden: null,
					TileImage: seedimagepath,
					Resource: [],
					Objectives: [
						{
							Id: "e8cc0242-a468-45c2-82de-1da88a4b5bc2",
							Category: "primary",
							OnActive: {
								IfCompleted: {
									Visible: false
								}
							},
							AllowEtRestartOnSuccess: true,
							BriefingText: "$loc UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_RECORDINGS_PRIMARY_OBJ",
							HUDTemplate: {
								display: "$loc UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_RECORDINGS_PRIMARY_OBJ"
							},
							Type: "statemachine",
							Definition: {
								Scope: "session",
								Context: {},
								States: {
									Start: {
										"-": {
											Transition: "Success"
										}
									}
								}
							}
						}
					],
					ShowBasedOnObjectives: null,
					IsPrestigeObjective: null
				}
			}
			controller.configManager.configs.GameChangerProperties = Object.assign(
				{},
				controller.configManager.configs.GameChangerProperties,
				SeedGameChanger
			)
			for (const param of parameters) {
				// Get the key and value of the search parameter
				const criterion = param.split(";")
				if (criterion[0] === "OwnedLocation") {
					defaultMissionPool.push(criterion[1])
				} else if (criterion[0] === "Location") {
					selectedMissionPool.push(criterion[1])
				} else if (criterion[0] === "RouletteFilter") {
					rouletteFilters.push(criterion[1])
				}
			}

			if (selectedMissionPool.length == 0) {
				selectedMissionPool.push.apply(selectedMissionPool, defaultMissionPool)
			}

			if (rouletteFilters.length == 0) {
				rouletteFilters.push.apply(rouletteFilters, defaultRouletteFilters)
			}

			const badlocation = selectedMissionPool.indexOf("LOCATION_ANCESTRAL_SMOOTHSNAKE")

			if (badlocation !== -1) {
				selectedMissionPool.splice(badlocation, 1)
			}
			const selectedMission = selectedMissionPool[getRandomIntWithSeed(0, selectedMissionPool.length - 1, seed++)]

			const contractInfo = decompress(
				"W7V+MZlu7pTbBltxRPHrWETVKgeoXo4bV1HzKJPDJY4qYS5cbjUxGoYRGS8Xsvst2WTj0Bf/89BtWfw3pGgQ00UqSKKa2uLhYtThI7xWTaMTsnGEJqeI3yJ7XQoTRKEvRUC23s+sL7tcVIzDKSuCD/VC4kL+fy6Fvt5k0enblvr96b531hRRdN3a8rb8yggQCSk4Y5xXDBWTQZYtMsBt+RKxMun3kJjtfvSqfIXKcQo5I5OXBD6UdXDYUvzHqv71OyYIhGpXxR8EwjHdFaHl/5mpPndHxYXjwHHtXI5ULdTb+d5z0bl05aIWMHP7F7pjgECllGaBma8UIUfQGVKuLFVh9oAGe47H54oV/4Kvd1NIrnSdWDth2bQ7CwoObQxliJ36MmRUJIsKOBPkGLtHIUo3k0e0GEtbNKaN7z0x1ZFaGBdENEUQYTOoX0ZR69i/6SvlLHjIabzSs3hc9yuY2+hVtdfK1x9kL7djEAy9n+c/NFJsg6tXP5DbwIXAqYXL57weu8VP5TNTkFGUxOOQQZ6/4jN7Jq7kuRce8evg2yAeo0Q94iDjbIk4VKKCs6850+TVdHP83mPys/qTQ/rDRnJbPXmzIhZTxfpypiUxLTFdpXPGLdBx2kjK/iqf5n3Z72rs8p5QlcHy5bzcr9FwbXp1z27zKOysf5erkphWuPrAetmfrXwF92HTMnQ1teEzr7UjdvXXwBtnZ2GPcdzUf139xQ+EfIUxi6uthgDwChHV8PNMYm/E+V3v1/Kxd34PJoaTzt0+vEBF88bXZa4NR07fS3Tywpldqa/Y4WPlgr3yuWMVXy9+SsQP/74j2qooBI4CTfXg1wHZeQc7uco/LvSqjf2tDa7q0lKkkkYsiVTxQswKQP2gGkftvazvVef1WpLumZR18Wo5uNOwa2NhP/MZvfOEJO5I1E4ouwH3hUE2KjPVrDOaLVm8403HDUNDQPRGTG8sX/koea2WH8rGLexrcC8VFB+4ktD8JJGc7r1WgpOr+cw/M6exJpd65FfWkjOrOcIv+/TQ122v9zMtEh6x91zB4aSATotwfFC3FCSbDnPnN+KPyV1bqGf+PHG35jg4q6N7mRLXU1bS3Ny5vVrOrp3NOl4IZMlgwLvjtEzI3oeO9Vjdcq990D6kcsjJvU7tvt9bgyqXBLeHnQkHoihtaTqPl4u2YNoxIzE9zl+uYXTKAGsb5tMQpJTMyL0kJOdZOeFoYAWqFhS10d7iINpyTgmJvsXndaGBNnB1xOuD3Jb1dPHmkiVB1Zcf0cK6HmByIbuK4uupHire7EjZ1c+IrYWam3jhL619qfAsc382J1pkXt8H1mg4T30S3Z4tXXY3btgdAb1hPNOyXshWOWxRiEYTY8nQSbSoLpPctQHcpDDNTBFv/n7xrq1xCx2iYYSs42O4PdG1sLCd5vt42UtcaH+MXRv1UdJ2vD7ZK/3yP5eicyQ3NOMcomGm7XCzU1l9uXfVsKcWFfGE7gpsp7blWOIfZl14Gs9rsnwqzmjFDfIK4uXFMfGmiB3qw2uLq2iCffeGK5L1nNSai2G3M9mZzZG0uq/7GpgkwF3IRxtzTuu4+5NmT3squROVTmLTntp20YEoLUaS5m9nwDKzvC8wfoBzEHkL7cl+Rr1UAplSta+zV9NevYDFN25eybz53jX2odpua6EXix7O1C7F9nrGoVT8kJhICc1B3mKAdyHhXjQ5fO2+o5FIKl51iGIuBXjzYFiNQG+NPTVUcgG8LrHzkOkJfATZHbjhb0d7zyYP7TtJo+tdLhzvC7ALciMMfZo39vTQB+w79NpQlA3oObDUAbrq2amZtX58xa2l8uaF8dq5iYS3UIC2nNpUDwVXCO17ETIGOAZxShgvNN9ITqzxelncvKUKeZvAjEMhgZNhfjllTbMfTpzJgWUxJkemlSVQHdFrr6YZRcqYcDAyXwF2RdYbHNW73pJ1d3yJtjU8bEC1eB4i+GSE712hR1fvmJUj1fVrDFs36DHITFHqbtkhVFlkoUq0g8rS9TaeGGMm0yp7o7LbrktrF21aFL+TvUkuRusGUwzLLnRLtojh1iEVoVcBz8qhsu9/Y570XahVZTL12G3EMfFO1JWZX03vpXyM8DpxBR0aJjFaoUyoXBNXsEW4RsOpDrlLeEISeswqj5rwrV4lrCYDHg8SrIA6odK0O0r+WoG7fm4/pJ0hUCnxWSoGBhMBx2h0amjUZTvy/Tza4/T1/Z5HSOKvq6H77yfkxsu03ZniVpbdrx0YrHBfP7eEDntzNnXE+td9XXXcSNjC1Wo+JWpWJSWalr+sLCjT1n3qA8wJWD9utJn3Ix3O3fQvikw58hgTztQbeUkCVAp4a8GWclGc2M3yIN8JMheQh4RcCtRDohLty/vp1ZhWIYvxX0ef+RxAB9YAdr0qwpiLkwqsqRzaf1YscxNqgmhHmwP1TgNrF+XEBUZbRNUQdACuQjwRTCqqG8dPmn6KYpklFztGm4N3DZFnoc66FTL3BvfUWHaq7uMk2JMb42nPLXGSn4q5V1R1pVdT7qyHdSvBTCD2bKRs3XqDbUYpJjaGVe3dkwvXT2Fcu5XTxcp31tseeqe4GKLChMhxTQUAD7xdOFCz3YQvj4qNhJB4jzx0OAR6MYT3oG6t7laLOTbJl7NmpOASKQAV6K1EvXh5V+mbFBrs61izwnIawLqw3MS8KD0jNO/uOlYUWroTJ5dizJMGxbBXVbprkqkXR3PpQ3uyV9d0uyrw0SMUlbpQyHruvsGcA6AZdndMltWset2PDKhE9By8XQdEL+SzQh5vcWdfq9wkpTN0bqLyeoCOQMAXFn1TW0vyfcht+N5qiM/epVfZR8T9PIFeKsarO07KxgomXz3pdGVoLhv1yzehRaNiRi3Cw8qKpx2DESjhk4N6nwito5laTkdYO58PyBzvRfmP0Vxbnx9h9H5x988YSjP0kufX7PU2pqWrzXJ7CU1pokgSShi1alZcqgS8DSrfWKbNd2+/K5CMR8xYIGonqDD4dWPDMz9qYkNI2NUk/eK2BRALWNsxSLrJKG6mZmA66W+g+Vv29KXKNBbUM06ZcEHSd1zOIzyyArsZUmdQ5+TRXPoCicqiq2ujkA8AKej1Qu/1eEnQqockIyLqNSbMARcKp17k0Rs5rrpYFsL0Yi/FOU6wEZDaYKXeGXmabkgQnLj8op4bkNcQJSMvlg6Jtg4SeR7sHaDeBugM52bIicyer6ur0VtWvCtmrGZKntpFmHrVanVcVyS6XW82Ycu9IMwhlIWz2nomg1ciuTHPowtPSECbIKcS0be27kU0gyTwvWa+uJUKrhXym7j44nRV2n5IKM6qI430IIAysMRgPOse6pwKmSRe3c2DhjcBXUPgJJ5cryc3/bBYqZSCGNVD9EilRhIOkVB7rxlDApRn4i30bQZPDnRbEfGoRnpfe0iux88LwyktQHqROwen+PoatfGLxJKVOQWb2AAZwcyB12LTFE/c9GkN39K+TNmjSA1z3NuV7+29u5EY3pjjD2Q4OEq4j+G8Lj9jbEHsArcorqCOHr0snMYLy0aJ3nqpqYfaq9373mnPrKF5hU3bxyPvCWEPWR70At5F2L2ahu7GzNrOZ96lT+4pjEqy5KHTecBWIEgSVyzl5NFq7m0D8PRI95s3G/huFKkgiB11TI2PZujeVLhYUZnvE+4FG7odQ4JwllpMLJnPFoWTRVdwtlMes7H7DdhlCK6NqGrqkhbdQewUM/nSGP2pAxeBdgYP337DemIHPiXvXuQn02wbCOFQvcR4p6ifxDIX1YePD2i/RF1GXRv3jXx7ZwYVXIhBBrfrBq6H73fLu2ut6oVCwPgC47COo9xIWGfl1ZW25G//tUTkDQLQeIdWh9D9F/lMRRuEsu8nX5+X/tbOg0LYFYuCtU0GtDcu8MLVaz79jYsqaUmwq5Bpt9B1PWDWQcjdQK9je0IpNJKISkeX+xvWcwuxk+g85krQ8AN9dgGtCeriodJOPeRzD8tD6NO6iGl/ROCLQqhjd0zsf7zi9xMTH3+mwq0HkiNqRXumCQx+vSqDmBso2XW+JaoZOfbBZV90uZhIAsIs1EmDdSOo38t+2Y3ycDM8kqQTeOb2PRtDtgIOQvoO3FSSeGtKxgaha1m6G9Z3QU8jRxqWkUUZQ/UUM++illC2ubaNsmh4YnCfbDWiMOa9YfTVdYVRiVUJs9F8wdeWwaQLWBlExzFkzkjSvb5r6izV1Obt5hCvBzwU8dQx9c4Kr+nJTzu5LTbPpWggquc2HtLFYW3ikktV8H1BefLUep+5DPCczJXYMg4iDiKPgakgcTvSKrujGbpWZBpNIi9sf2+Uy0sildIagTLd6staz2U9PGR9kLRpjLa0F9uwN2fHJbsze4ejwVoYn9Wx4i48P52ki9+esGR978tU2K++6srVMGwzKjgSd/crx9B1FGgG0rVR4YrIa443EhuZ6pKhlNo4mb2ReA6qPbY8cZk57NJY2Oq7RrqZU7S577G9WhA9idM2fU+6edAOJD6BpBaYW2/Iz4ZD9S7aBOVloJ0Qx8W83Gftd3dRolm55lL3edhvGkwagveClLjU2d85Yq+htSUMhjoYR7+owEdoyK/uW/t2ysf2xaQMuZRhPWFzDH0HND3o1uDQZNU5K9zSg7tW92/xqAtDhxr/3ybg9m8/syCJCsXIBPum+Ov3H/r9+U0BgYLCiqILDFC0ADVIOFKiLMtANQl5LtLK5TPb6jMYYz6mvYx0dTjK5cKsXuq8C0HWSPNbYY1cap3pei6kDQNIhTgO9snZMxMdLoUK8NMP2CpUTD1jjCg5tfbEObhEVbyQjkUSaHFbO3LNLMamr4QpTsywwqhNSiiyEUn1iozTuJEbzCx4t+DBVGW6vT1mpeDlS3xBlwe8lXCqIkCI+b53ntOOxKLotqeoxwIQDXHsh7uYLy4V4ZBNYpsls2+ijQnwFCiv4OB6N71NdsgD9wOYQcaQ6IZdVPRcbWBiGNXtSLQPBOZ81TTuSRbjWoXSPQKLyjIaJcMhn/fE46BuaTQPH6GZoFZpTiBDznxOo3HZaVm1fBNUf7NmE6OaUNUf+pTAxYUzXJPg5b7hu01QXjugUBjTsESnSNYxMSQZl4vH0UwXeHKQ+RyvorerMlGyG6+oUsU0G0w2tYS7YMgO9Z5NIhS94jU7alqCeYys5zj+9qsjtLyQ3Ll75ODMMxCl8DuJJ/uGE4s04dNNvdOfktZjOxUpUGJm37e4eJCk2q08D/kOA+uEpQd9pnbsipyRuHqvll+0Kz2rAaZG4WMnXTIKphTUDqdZ0LLnHUnF3tAtKlopay+ZYMd+3YrX/ED1QOKKe3U1qG77le9FmAqfgsMEmAmyrZB6ePadd+W8tqo7E6YjepfhaV6w/RD0Cthb/TSKnqwPVJ/0RD8eYORQx8abd0zjuHfxIIjXuQgDOEHcgG8KolBhc8/1RiQ3d2X2A2MD/AkiffAeZ/f4ahMt563t8ghX4wG27IWsYgC+nGKL7wzjcX+vTcfpD8kr5YoYHLQHYF+E0EZjHr7ksUh0RWyOS9cFAZuBOyMpDe1crTo6+cazjpzj+DYaG+c24xda/EOFpqZoFm80a3m1Q/SLXCjs7L3eRiErgFywe6M78fHWmZokRjhOACPBonI4/W9vGO86tDSE+r9JJNmj4+PiidzE+NjftG2r9O0JyuhZGQH77Pet17Zt1Xxk9FA/puwS6NNkH18uwMcDMHpIXQGGeeSwG0VKRB5MxBLKZa6b9sNAcF2Aegh8rUBJEds0WJ5MxCck0VYB6GLqrA779vf3YUMwE/TtqKdjcsiZz7WKkSPLRC9RW0S6Ii3Ztdr5JS4UESpWZaYqEsUpJ59XPwZMeYcg8cSLrdh3+0J7mAHMbbCko+8VtsES19AxHYI/xlDpUd/EwiFljHWXTMLRW3YPc6nH9nyOICmQ0hkW3UEa2SSWT3XWuvBYKcBygYoMVDTHo1qqJiKjR59Z1nzPZYrsuC9G3hoAsRrk1FBaanGu7lR5kO7WZ7RoqZwCYtRevI2xT3qaT17yGrl7/E4TMZ53FAOQdn4pZ/1zzHRXR/a/Y1LbcATKdNzUEOgvmeE68NLn7OMMz2rPyxHYCwpkba1ypSVAPrr2SZZTTB+ldiCwnFxcVItJurn7Yd6oXQ3AVNpTWH62hDJGCUno2VzyYCSfANIBminSM1I2+tZslT1Fp2SCquNuPAv8mkKUWerbTNoguSdvZUUgVgM4L+C0hsu33/FN6wr+naeV4Ye4u4epFfGGzHuZydNeQtLAFdlZeLYCyBAQyZAoOoxc+lUk68VZnCOscAH6IiieInQ850u547AP7tq6HzDX5t0wktXU6dXg0NNElmSV3kE6A2dpgOMDrMeCNqEpb3nL4q2WWeI3iUO5J+WCfhlMO14y2XGAl7nfizbDA0h2zZjdgKIJAC1D2NEwIHLX+LCQroRjNlPDgntZBBQzsCiR4iylItWzg1LAcYptYfgriutn34MHHNsqqPT7w/axY9VMwzKXWSep7gPXuwHGGyTb4YjY/e59lOR/5As7irFwl/dPOJxFhpz8hRTGflu29vjldXdrsCJoZViJhBbW85wwIe1Qg6XIzH1tFPjpAcBjICXDPfXtoXf3EfAz76b/TRk8eY54Xe8gCi2AT3ecCwMJdvWqW4+W+/Zv4A5GN8BcCI++MW4TsH1OdBPx4O89U+dAnK7BauJ3nJEAN7/58SQeU1kVwRoLgGIBaQ0yUZ+nInVcLmZS1sUe+RgAPAfhPRaBaD2NcorWOOhrMAxpWPQ1NkYKY5qYXEqn1fKd8NQC0ENA7oCCoF1n2JeV+pqioqRSbCT54c04ehMSQHrL+AKzn4DaCrIeYYnYwtXdltlwpL4qsoDFCqB0JB6Dp3Ky0+vynjezckJt9SKQ5QhQVSB0Cv2CbfwVypZNYjnE/laggF2A1hNJI5HG8TtKWa4FrhKeVt4j+ORcbx8/rc+NE/UE3jHACm1no3GR/qQCwbWZCgCLWkO2iIfiTtn+Y8cFLucZwn0ipsF8H5wW/j50nnq7qrfa9q82stVv1ek43ugvnOEyi6li3bxgYAFeg3RPVKWaWvXqSS6GouUyBXoc+EpIl6Bu8J2jSWt5svzEjmvPF1S3RyIIJUXdk4+Ptpkj2eFcdw6KLQa7CaphHHsedW+s9gaJZq3ZffHADVwW8nlhvJ2l2+K9RlJ190g0QvoAb0auCQ4uGTubKBwJc5BwBspzBq4C52EMPU/srfPmsd9Yyz2N895gevxFT0ZikHvyilpUQR36oQ76KWUUJ0pBlUyibavPXLwKA0wCRxu2lr2zda1a7GlasvfC7pN6m8r3g3bBK4tMQ+/fkmBFhuyBWB7IIhiv4rIQ72P5+Jh6co2+UHR7GsVi4S9mXbSooyInxDN4QnUA4gcYLR0DRwrVq4sdZKMbNjFYi9LuXkABy5ZMLrSizN+rIgcL4BKQzgis38n+2txE0t9+JkR2gMUK5GU2DN8l94KEUKy2r+x7h7nvciOcQt/CZFdPIe6whKvZ47MZSJVkr06yRAfEkTw5L7lDsQNWa9fSuPv46V/Bd5oz0EZyLqOrpEQHSn0BOBThJgt6XP3bpdta7rvfAPaVYQdHgIzsIXLvXn46UYtPnuIh8Pzbw8slOz9EAjT7Z/r7rSEY0TDCMDfYcNaimCsO34245BwGzu2ykW1nmBRC69zSGR5IHoJmpC/fGNMHwGJEz6DiWcu2Ua9mVzpHlgQiYmHRt5X7wpXw5t0rSJLH7r3PNuJVWKvXSKyLg3PW3rWus1Dko7lv491eAJSQ245Rqkmc9bKRkC7yzsIhchC1YevBubkRu47IRlLBh+c6VN4AlyE6B8fDn48euVsiz1qyUtF4sDcvlcTQlrx49w66SKzEJrixTx7YtaFmQ7nNkjqb++CVNomYv3Ln6XkCIbp2Eo981EdkCcnZmJYeVJ8DogbSs7DKj19Sb2eJHf3uWQFDYlPXm5m0PnnVcrbbCAWQBvVBv1hAYiG6HT2LYkvn4qWp0L5ZyzHgWqtNUNMDHm+qde+jGDeEvNzkhsNyQZ2NrDlQ0JY8FSwhfe/d1/F2mIekkg7OvFu21cUeErBl3qtxSh0ABXLTsOGesDS3McmxxLNicI+cF5U6IhhjUWvxOh6WgmkuP7IK0mgQs+BJRdh91yJz7/RDixXJ0q4TlSqJt6swPXtBCPbCwKde2i9OpPjZFTH73bso0X056BRET8E46VBRIs5eSkMBDm18CyMVRxdTSYGJTbYjGV2FRfhrMPAZMVqVy91RQ74Uiq8BfCcQjkLFqb1PqZ1z5JIyYGm47OwJBGEyxGNUWTzV9a/dbb5YHm/8CbYFK2C0mkm9xZFjKeEM+/nb2N+s8MFi37dEZWHA0kVay5Btz11a3I+kgt3dhhQ57xWwrTF6NImHdc5RbqK/iXQFoRWwQL412YZUtsFUXVxVdqskulzO1gZphWFK2hsLnLad2euys18U5eFTfiHxPgCcBZIskRc3vRfiSomJPTnQ8gWD7VsTatD4A+2+7xFNyoVizpv0kHCkDXAjBE5H6JWXVMejjWG/LdVVGxTYjoHuab0DStbZ4ncVpaUBvY6WTQtteQWUXpDVEwmrSgWypvNR5olXpPnSRksUJ9euL1ndsmAkw4Sr4+gWkJxp+aJVtlR24wgFbvGwi0Ebw8gv9/m63Mah9QBruf+KOTT8Wv+OM0nU6i3/jMRY+8uNPvq7zWwVPxZnYvuZL78c+KXeDugjEqtmnUfP55LhFWLnBd+GF5++gba/60PsKt2864ig85HP6A0PpVUupLaJWQxJ7gjYTQiYKeAtuXvJCKcM0o7BRCTggiiuth/jX79vFETEg79jUH2F4XQNNhNfigBLUDUVoi19SqMu12a+gMhcip8eX4/htRxQnUR4NwnuIjOUbuhRMxWoMqY/InnxBpQbjq4AhhLk7vBKRbfc0/Ma9jmra56DNHsYuDCWehaK7qpF3xSUKnkm2E9MVQNYVQD0FRQpyOiU+sraPQiQFUPkpoZvvXr7lso8bPMFIr+Jy1LscZnJcMC/o3rqPur3GVQuKra9e2/ZJObc61YB8MMBlBdodUPRCqbzsmQjZ/iCB8cIqezWokU9zYHghHx+Nm6EHah2EY65sqjHc+UR7fOQ1tHSCrmwIxU1anLy8hySV1xVM/L/GAF5g6lfJ/UmYRhkQ9dgJ2aVXj2yVUAfdiVCgQCn2sunb9Wop2KWb7h2IFrNNDaLtKHpXv7zihGZxLphFYeBez12WguKyIaQfseuPvtckatpfD9F34eN6Uy9rMe4LR4sUcgozaiS9h4iuGl6OzYWjXlC2TEM1u048wJAMynJwykjjcF0IdqNRh6RWBE9G7HiYLo0s+fd+VojfT9vhd8voJBE9XIAgLsD2AkY6MpkAKiqAbzQ6C+t25vd+otluCN5CZ/wt3QfUNmAamCvQY+myf227Ct5nl2uapQ8m6crlZNwetvSt+VUIdl8LccPqngCl0ZsbPSsvW/ztt3s2W2aljCa6I2YNCEsPutSaJ+TSIZ3PhbGzLtAnYLbNuRCrkb2ZNg7NES8Me4O1tbeWlPFs4ru4hEkhe6p+8E8AagFynZc6JYaKzrE/vze5iVYsRWrw6lRgWXph+i+dELipG/rKHS5AHQgmxlpzrHq5D4mCypL7ZvImgbFg+g7aLDc46rME5Kat3aSwvwKzA54JzHBdt56LyVkgbSalz1g54Gwhk0Cezuke/jueTfrPd1cC77tmnHfljEb3UuLbNWhkcQ6xlWFOnGDi4Vkarro7ZUlqSxOfy/kTAarKUbqqeaCqXnDT7xZC0kG3516MXQFKB+keuC57x3reR+WLLw9jBK9dFubVjjCUS2anqxMEf7ijZr4TYn6IBUUcy98xDNUegxJiZlZB45FgdcbAeRYs8f5qtcWJDlz1lqCO3wBe0Eig47HLr/Zjx6SsrhCSjgqA9YEgj0Is33Dd7eRTAg47tuFcfuA3A/2xyjra5Tf5jGT6B1tL1Ccimiklm88ZLfc98ppvF3l2envDmLd26uYrIJPCqU1mSzE+vUbRXYN4Cj45GLn7g7TzJIZiQyyswtV7QDLjaxo5LM+1nbUc93KgIOvDOLtBdwZMTvQ+/XcORLcklSlu97FvI2Bz4uaS8WVs1iXuomlF+PsMQjx91EvFiVPfNVbvDc6c2FG7Lk86ZgdyfvZHL6SCHnZpVCVhNeWCjzYujZLnPa7dUXcXbbOIZS3LshnkG6BbUdsFZNQkV5tPHWXYyI/1x3iDqBUE2e0W3F2dKj3r3wbCvQC0vKoOxm6LsZ7DnAH1Pfizsqpvuz2Mnw3FHI1WsXjLgyd32///F0av56Rk/mHgs0Aqb/SX3F5LvcJhsn9866DnTA1HduBXukeH8nt7Xolr7fBLYI955e054Wcpn05zdLFDmHP9Ty0Nwvbc9mc+1xpc9punOPbtwGqhK74Yn7dpLE3Cfi7CNJEq5tnfF/LNirrcX9QcWkN8FZ6aBL7HEaD6GwIm8HeQfI+SD7Pt779OmQIiqN/eSmkppoHxKgDnEBgWE7EQ7tezYQkqvVTztrlHi6lQlRIYOVSwDdNLSO8+iVMxulSf8lMG3uSoZYWpwN5EnripDIV2tbL2Lz3GJLr4UofhNoBSA3DXZiWlirNfQjJQXNPXvhtBfcOsrNgtdhzi+awTKotl6dgriloNljiYbN6D7+xGaGAeZvqYjNdgKmI4cJQ0hcnxsPxiCOxjh9e1l6Qw2QPtU5nh53gRqKuS1gOCucBngtWOtiP3PxRbk8k5Yurz0Zle8DsIbIUXJqk3DunZRLhpVccGTzAlREQhEFrpL3TusU6r/gtQYGjmEmmciY2zOqQLJGF5MJjxdvYFQXiESTNaHPE3vHUtyXfo3U4C6FHVDxdU4Lkk8Na40+RvMua5YnbdkCxwyQM26F+02SpSND3YhoG1xvsCGJ7oyGfWzfVnSVK8TJSx5WyVn4C9mOAbr1nzCZiZyCyOI7WerAsSm1a6LKtV7LkcyRzmSFOaJADkAWJlYjIEyuYZV/J3cXdu2B4w3u3k/QbWEpj+rXOIU3zgPdkYgkuHAabDSsX6qtFrnQqWhzN0BfBavCpBMMHLCVMGqCbvbbS8z8NNKkw22IqtHUtmaE5CyLzG/bohJoqKR2gJ3w/PNoDkp5yJq02pLTW0qpryevoI0se2GHUEZDXqF53V4fo3OmKOC2cSw48LcAmEbgdQ2j+urG84zyiluAFxA9w3p/gHWCWqLhkGW/0y8P8g0B+C2XmmFaqR3oNPZ5hQeTZesSZ0XIWZepREXcVxOGXALtQRPMw/856NPadQwQMQ2m84gMAp3uwFyijbj481lklzEpx496xBK4PNBFSI4GTD+tbZ9/dOSg8NKlu4k0ZkKcITcVFf7xaq+mSQ6LkumdtAiD4JEH4TsRybaKzszc7PUnjrTjthUHHtCqE6TeOZZZUsUvrWnQEN5kEngwCKpJOjPgt5nutF3ixYh+G1x+QJYjuAznvd6wlzSVj3GqJg1udvqXTCOKLKS0qnas6XYy97R6/Z6zSO3wXFN9Cu5RDz1vaP6wZOEWZDABNaxj6YbRrBpGk8yAjsVi6cXguqGBEyUIO9eHm5SmV4TjIez0vM3kaoAAZlSwPla/2KmorlreV6yMwDx4sfUKiaktcDwA4HVlaWkrUQFcqBrCqDQDGmo42TXZwwQw3JIQbbK7EIdwQAjoC7yjKu7vJJN5jJJuPlz7G03QAafCZQ7LrjsoTSoFBdT8nGa3V45HKKlBpTq2nswKJbV+R1Si5CQw3whdhbHjz2zl2zECz07ZkJJuApYEmFkJGbmd5StOiesNSWN4xci6Qnqb7TnOu3XxNFjbadu7CcC4w90KuGw1srq7kGdM8IvvNDrTis918Gxd6x6CIF1JkPkLQM28KN44DewuJFqi9iC+xbV/sTyueGCNbCdvzUnE5lrw+XptWjF1I5NTy90XuLzcjTR3TNP3sU4dCJrUqdPMiWzegNIQl45yEZuc6RWIVYq5t6DmD9Qx3Y3i7G8m3buglWbHgxwmLJXhLkCWGrrJvbyuaLRO72NYqCDsP8E5EqqFbPCqpiluGYt/kocQ0N7CXEV0HfSlKRPLmk4WIZz3a2FkOcgqJtvHK4gXL1BOSwDG7t2AUAm4b9h1I1+m9rTmXRTHNsWbUoKcBmgJuurisWtP7lmdEXiOKXnujKbMM9Jr11BKb2prFqWvW0ryxmScPuFXS1OA+olUo2XE80/SMQ1hCQmN6uV2yx5yoTUi/j7eDtWezdzz18QynLojP6zxhRbU5gNiQRxtnYoK4nqqNwYOKb2ujIq/KHQKsworaeKPf1r1WtuqhVsM0MxiTB13w47Uwtw2kNQKE0LeypGSumIwxlbPMiseNyoXf70/v90+98juAUAIwFKWxSI9R/dsQHG7i+XBkNfMlNSWV0/HSSdp6VgpeNWmNOa1g5EK3D5ZeJTJZYVsC7N1pZmxGvjVZCzFPgNlp3XzfKs2f2/GnDjjf0dauFC73C3tGDFWrzQfudb+GrHh7RQSnMXxbmZ6EuVsfnmPqF/3UQb6GwhMas1kr+PVid1939yvstY0xh2Vu41nvSW9+w/2uE7fDOaaWtndrECeEik0nR0ZaSqxQUNYb3NjDgxPSX+J4yjaXRs5oE1b13nfR3t4ATyKX4kg4pS67bWnYFXlZ740Iebx+01s2Y/Gmtc7OjKs7XTSX3iToHQatD7I5WKMVrnJ3yYf3K6TI/UbFpdXIt3Au/PVR01J851F7W2InQ3wDdAf0nKDyLdT+mnctHLSam6hpOoMPFTNuUlRvP936Sf4fw3xU8pAsYbhsZANGPuO2ucqGUzUAVrtVp4HA7B1aJlOsniSWS7K0UiKgLsAOBOrG6rVlv+1vPTMROULFDpYVXBw47ALp5u0nbqlA+Tz1tjnbN3z5Qz6ftNlqett1+klTKdtqhVuqDY5hlztZrEOim2pUTk9M9/lau4xYhqYWDWI4IiRFa8tCh0+dCawZAciKDG4kS9sT5c0SAI+02sR4V5+4G8ZDTcyXxuJzlw3i23ONDzRO4PVByiws6fbVLnKPHqtvnaeBXc2oNFWjsL3j9SzdrDJp3HpkE15OgZIF89vIvdLvitpIwcsodV9WfQIgF2bazWD75NPMvZCMbBEdQb+3gDXDeRIlH71rO3NfJNKL/UrCjwLwPohnCuwt77h1JwTC15si7blmMScVtiKpL72jt3QEkOtWNffWcc9uqrxAhV2UcnSdRpKRpxdf9NID7incnujYcW2vkRkktc+WRWLg3WCfQOmJdL76eB21JROTt0LXxq4ywOsiyQoLeWZHLZ8uKIZTmQhjikBFInMKXbjC19NYbFHIuvX2u9H0FVAiSMNQ3tNVr/jx5MvQBK0vrXPPLqFcHpKYS+40gSESaDUMztjbnvtGRy3dGDuG7niBEAfzBPYwtGE9x3cNHp0DFUrXPr4/8H6XC2UIfoErdFLFFNWqMdbv529hor/fvSaQUZGcy3jUzsEDA9KAiQfyJsCT3aYmJ0buhx/WTJBZqotQGJbZ2F9tyHthGZ1OsSsUbBhq5cZbGNvtnO5U4qnYz/wp9HOuzSurpK78/Ca8cQG2UYB5AukclLX0zlCee/mi6nc6zxrjkelzx1vWUP1o91hZkAFJtbF9qiPCe4KR+5mz7Nq6NhSGd1EDvKjEsL5mNAiqe+VS+2uLbjshECvd5cxdbsE6wMiuVFpAqhqAizIVBCLowGIZ7UjQ9TJ1XT54OQMkD5JUEHb5xlTfS+wjNG+/wH3Reuncik+xYq2it5qFX8l3OfzcbobJqVKE7FPr3NonBEnOpQwmLF0HpAoS8kLjsjinSwoJSG9ZR1DbL1i/CN6CsW5dQqdqSazVRbMakwIfTYilppu77uJ17xokV2/rO4LGtAG6IvYMOiziyoh1B8nUiOgLlBYBYAPzPQBa7jlHSkag43JrCbu126u14FeBE5nH7VV0mHozzxVqiPtpP1nEmmzxYr5ZT8yQmLrd0YTLDpAxqOPgni+bc3pN4jXm8N6+iYTlW63UAlXPbJfe8UzicjvfOxgtwbRuy7iN5PCxznQySZQye68x43DwVyFZp1kEX9PJ2y0gaKV1NnvLLsAZyFT6L/bqHbTSprlOI5dtBHVEQdtDogQOzdrV6tl2OOXO4ViEq5ny4kcnDx1qq1yefZ82MIAkRLeDGRmPzIiWZ7SwW+vS7mDPLJ37506mnyqDmVzt6h/e0b0UgcWWshii9maujTvvAFJCqD64zyq3KaqjkyXxvXpGGhWUgLQgNwRzxiko7BXpRmg+evIGNtmAKEXIfShb61ialaVPwEOMb+TVjTpkMHmOznQqrKiJNVpd/W0d0p72yH9ACDqlxbPzqAPOt5yhsF4A60PgG0CPuVlvfyfD4Cyk1T22N2HIVTxwVMJ9rrfvj8sTyzzHUjnP82muhc804hWpQuDhIVSMBiDJxhWFrL5FxT7nODfXh64SWxhhZLLV7fXJu/vLbZjNk3hla5HkvgjjAjQNrzQsuW91bskrkwg2p2UILwc1A905eDS96FFePsKtRnn4T9ZmRZ36bNBDxIz60jG8ohZ1+vVdag/kILQOPOcdEwmO1vzkyR5O9FWKsfJaVRDOUw87FOFC8pBsmh8MvAE9QxQVWh5XVzV5VybjR085ocQuYPwgP4EN5KfmlZwjFHHaKASiZwDVIZLGCvflc3dwyiWWxufORSHdwHcjUweN97okQ2qLjVqfMJ/NaGyJhfm0+xJv49BZNK4pYLMqYpQVnS1bqgWVPxiCh1n9jp5QY1es3C3Rxei8FjA25O5E7brdO3tlqhoHYlFESsQkP1R4DLIOsmVhmlrLs9vriL3m6BMP9PHHq+vnFj3dBLuuLeOszZb0XaBY9gSDI6xJH54oFYwWezpv+77WwSjddzN1qR9jvbDsXOrUWdFJglpvAL4UKTuFm1e8iErunaXhsbT5Ho8alTztOf95b9++NkeMf61nCi2s4Cm0BuBiNADDtUbftuKfdJ9E6aNXOxiDOmUEJuX6whsesugnTsE75xrmzAA5jjxz8NrOPXnrCEnqyJAMGtgFJAMzG8LNPOYwdyK5WWW6E418gERDpgYJlw+d1giZvCs+3Ym8YdDNUFMhMfc57xHzSBZIwSKN0cogdiJ0XxwdvtkjIiQUXfNWGJ6TA0uGcSU6+ni/Hj2hoefqwc9GjAvTe1JFBwfTqHY5yUIyW0tqJfoNAeVBwCUY+Hkok4Q3MpF8m5gC7UUD4UDsEsS5tr9emjNNTuoYbT/pbGb1UvcU2Fr7dIrkQrI5ueIIXkkCSIaVCys6zJl0jbIzsK+aB5NfrLakdglG1zlFElosk7OnmzSgKAZrgZww7Dg2VnzaXCj4aS4ilL4FthsJe1DUWU3lBAmSNxl++WJyLrCakNvDcXYPU7XcEouc+rTDrLZu5XmwlWFm1FRpv5jUW528OhSB6/THqiyaWQ2/5BMj1Bul5V5mmmSskyrFRTHetUw2IXgeeOPwMGENX6rR1OnjkFVJU7vSujserrtvtbUUU2GrLxoboy081FTZ8ef4Y6yTKrSw7Jye2FKn2bWLfC4j7yoWbxYMJB/mcRR78XuPUONwh/gORjrT6COUHRitRlQp9x44/Mww5CxG5jK5W+lJoHE0uHgw0sDp8WJn6X5S+X58c9O7ChqVUYt8+l3+nT/uwVs/vbD2fzQqLUFi9DUwNRjGqHSsTSHEBdCwIvUZt/izedgqhZSvCseiTRmBO7u+4IaN/QkvH9kIzIPRm1SujfA87XRjz0NCz9cpE7ywBC0HwZHoWGJiVeGCZJulSi7m1IBQRtZ6uBfPlIOeDBL3uauCUDoY2BbkuqFSsZdm7SwkNjXs45gmBJAGqVyofmZbv6NRSLbscr3EZjJwTpCyYMWV59VGSjZIz+0gb9xmBugbOdJ4OsRWOi98WfraM1Es1LXCm/D4xmG9JP2WliFZs6F1BXg6GG0ke0F39yRFEl0b5CBN5g0mRILLgK4dOVZsRs4RR2/wrZJ7e2322FKJD2ZZuyzL2uP/Mto73V2GprWB0sBXF358Y475qXOK4F2BWnq95kSx2CDywK6MsnrPWWe96zvkkPSQx2lH8buA20bGe9hVfIbrPHbJqZubjyPGt22KzkJMNuZKn02987DoO2vxLEyOwe/xoQH9isyo+wt/kICtG3Dm3T/DWePZ3OVApGr6HM9zAfQFXyxc2+aneK0ngz8ljYP34d0kA4uHjpoho/qH/d5t/v4zf/4my9Pj37999wBcGMwrnD38G4N9RbaEqcNcZcuBDjr3eJc+WpV3RKMAPN409WmW48tpWjFJkRonR8C9BW4LhDtxcq+dXTTaAhGyfK+zDsiBhsQYug1KJhPbLIvEeleeZmBRXKxstdS6GPpynP0uEaFgXWerQ9gM4inyueA99twd7cNIBNneWoQ3E0BaYL4J470iYc+WIHFwue0XpDioqxBL4exu16Jjd7Mjjd2+hrWbsVvR0hehcpMwz4pysT4tDW8MKsGW94KVWmM+tkdBVaOHRPq/jLCYLCfwRgnIHkRL4SXFbJIXXNcgTybjzlHte82382VxatraC2suFZ2bymoxhsb2Uxbouwn4cuTGA28zr4mSezjObowQ9OaSwuYJgB/SesBmrePvPJHINYplSuA64Xa4iERBYLQo0gP6xRyP/Es9vDx5OYTKfq8xnyfIkwg/jPV87LQuFRK4PCImG4CLqpA69s53/78f9H7+dxersFoRXN2/rAEYg4hFRIHAh8TWg0iF4m1G+b+zbEgfsEoYJGrsiemzIVeX0zAN4gO9hrjX7UmRhJQqvLNrir2INknq4RheeHUGMBtyjyFv3fPm+XtuJmxjCVuhxd1ArkDDhuB37luHjkdy45NczmyWqWxvtIx0SJ4ZVXPRNhRP9zmk4I2ArIFUB6f3VW45sRtPa7fr+EHS7Z0N8rEj55wt580aQ1LP1TsP3mgC4INAT0xWfVRLTjxZwB5l4YXZeYC7Iv0xOlX66g5fpmns4r62kHCI1xPkKgLBu9HnZnt28rms9ntgsWuLiA1ChrFp9+vmadq7ZRi6ik38MqVd9veuDmAbTGl+9Kt7Zs3bR8Okz75w4sxhHro8MK5ifBcLpy0zbRfB27HeqZEkWylltXLmZdL5PCiftgv2u/V1LH0rkX9aMTvhal7ayErsAWPuP3v68PtMpV3acr2trROkeHcrlifJAZsj4YMS5UmjQ5OGD/C+7tewn9YXD2QAg+wtbx7LjhM0iGudVSHF+Ss5rI1GyRiuoAG8qDTp0B9e9xO4jlZmJPHg7B9QXxcRSJHYLvBqaQ1Qi0mZ0CCJUWUFAFT76ysHjpId/aUxzG8CVFGmDzUTezbtwRroCQGRcNPKfRPJ0/FuSXQjAnAfVCHIHmt1Kt3HLvPRznA2pO3hvkjxwe6luoIp6CGJK106grknwZJDvAQL7NnlzXFM8mltbQuY1pABDGnUGDvX9+bsc2XSbGzJD5QKcCvkOIPrfLI097N583b77sUsmALGhFjhXeSpo7ViLQtB29zeEGiBuhu+Fyj47jardzploqr36jlo+wjgvbD7Rfor73XGUjFytZ4dq5wV95hzzEQmgYgzRRFdJN9w6+nAaXJbZa4ibl3c5nl3rOrucDF85uJ+TH99guPaDgFV4oyk7bw1B822gA1G3Bs05MxU97124GvC9M41aP1sG+ixkc8JgjndvkT18iLpxMVSITmgGiwcoghptBRE4u7iB0r33wMLrYhLuYz6U6c5KEcK3jOkXkHdw+uupWQj/rcgzehdxYzanON+v+/yVy4kL4UzAg+SiDA6OevavxDYENgLZiwlsBBoZFcuvAiQqoxCwsWaij5Dcm65TOuAKIbJ7DDO3QcsE6FCeEBzwq/tJ/iq3bXNXyDZHvBFXCzcIH/HIvyUGakzb4+NLL5AKhDgjDcrV7KIpOa6geupDNquWS9NVX1QLS9978m7DRLLXq1yUa4OuH6I4I1X0yeKVd3MhBK/Fjc0ZAO5N2IuAV20LvlmigPFR+xnmqxJeLVGxJ20xcrxjnhnCX+vd8nqjSttxUXsOmh0LdvONb8SXxVR8IP26rnbqkSxoCTYhmLTDM56PMiXZ7Gn+VVnXazprKnI/ZIWrvuVxSpY5ReUDsKiUVNv+JE0ETvhusJL0WlvTKpTiQZd1l57SrSPXMLqkj5a0EYA0g3rcciestoSyku79JP50Fc9FYud5TLUfFtyMHQ9sLlh541+3vQuCdsE+ulzPRN5ri5UvHz9CPdm1GL6qYEUKKSxEMyRRP3QHlrodB64HKSbYu2xtpJHYboSmnK9exIV94CLRmQ31H5bUuNaCjj98exRDrgdJhpRDBgNFrn6R/mt6riFOGvQ8hg/sWIzmrmB7kFiHGy1oF1ktVrGmqVDGGP4ayN9Bj9Q3sd8Y6BGuwqvQ3lY7B5+5vM9L61zhAyjiSBc5n8IrBLsClPHBhYEZdSVC7MEtKqJIOudcLv+lMYy0pH24QxLdd+ODDNekuq3rqmjHh1A/CD0iwY5vKQ8+yJ5LHqECOXMQS+D+hmu8ro9dlocbyFiy/xpV9vTXbC9QjG7RDzGxvj1fU2XD7a2J5EIaYVl9vgSd11I2BbJlkDFs0FpwZGFeq/1nBRdC0nglO5KXKIL0gYyHhy9T5nTn7fmppq927HG2paQBakxlm69bwvZfZG5ipVf/UUR+4ZE+uK+aRBFkF9DI4u3Xpx0i5TUDL0W3U0YwMvFIt/DsqM6Vb/stWVGKC1fJwTX+4HzgzRq3OgnGZdd1gpu1yVyP1mkvb4E5TVI5EUKjeyQfMSXkxO5dWzVJ4dqJY6xvbOFn+ZxwaIf2fgmHKe4AZh8BROZNPFGi7uI72vJcUf+ecRcM9K4/c2952SA08RqUcd6TzHsuehOt8NnBDeW3EL+VMSoqi9RUzWQ0sV+5/930xjRxCUilLrxeebhPzGoirQYTNWXtBBooSuV3fHq/wWq+p2AFmUi+qTCtYUyzAOSJ/vY1UB3Cp7QVw0NjNxFO5IpWNY9R9wKy1aA6QuDXLidLMk0QkjyjqnuRmF28KagCEZlCnpyS92QHDCPxMYtPYByIZcb1W/a3aHOjKSur165WGsN3knk+gN7a3Hs80jY8b0SJ8bG1zxfC+d+m/AunNc+Z6oiahtSyCzK0khS78LKXmB8IXoM/TInteZli13nnnrT6MkPe2odS2oh27dknXuOh/ZZjWTZFqzQ4FFXokNcbDN+YmdpPPWOA2GHKEku6CuLXModLolcUOUiOEZB2YOqG7y9Wu+1W6UropmbcAvqzgNDifTZaDXvUojLdZHuaqyBwRmaBmDUNs4AMxtu"
			)

			const info = contractInfo[selectedMission]

			log(LogLevel.INFO, "[Roulette] Selected mission:" + selectedMission)

			const baseContract = {
				Data: { Objectives: [], Bricks: [], VR: [], GameChangers: [] },
				Metadata: {
					CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
					IsPublished: true,
					TileImage: "roulettetitleimage",
					BriefingVideo: "roulettebriefing",
					DebriefingVideo: "roulettedebriefing",
					Location: "roulettelocation",
					Title: "roulettetitle",
					ScenePath: "roulettescenepath",
					Description: "roulettedescription",
					Id: "rouletteid",
					CreationTimestamp: "2000-01-01T00:00:00Z",
					LastUpdate: "2000-01-01T00:00:00Z",
					Type: "bulletdancer",
					Release: "1.0.x",
					Entitlements: ["rouletteentitlements"],
					PublicId: "696969696969"
				},
				UserData: {}
			}

			baseContract.Data.GameChangers = ["270e1adc-06d2-4680-b7c7-53c2599074b5"]
			baseContract.Metadata.Location = info.RouletteLocation
			baseContract.Metadata.Title = info.RouletteTitle
			baseContract.Metadata.ScenePath = info.RouletteScenePath
			baseContract.Metadata.Description = info.RouletteDescription
			baseContract.Metadata.TileImage = info.RouletteTileImage
			baseContract.Metadata.Id = contractId
			baseContract.Metadata.Entitlements = info.RouletteEntitlements
			baseContract.Data.Bricks = info.RouletteBricks
			baseContract.Data.VR = info.RouletteVrBricks

			if (info.RouletteEntrances.length != 0) {
				baseContract.Data.Entrances = info.RouletteEntrances
			}
			if (info.RouletteStashpoints.length != 0 || selectedMission == "LOCATION_TRAPPED_WOLVERINE") {
				baseContract.Data.Stashpoints = info.RouletteStashpoints
			}

			if (info.RouletteDifficulties.length != 0) {
				baseContract.Data.GameDifficulties = info.RouletteDifficulties
			}

			const killLocKeys = decompress(
				"G/MHYCwKbBtZL624D4UV9rJY6ewliEifzRlOe6dNlf9cCpwBrd3QTb3+nf9uYTUtAatiKysFFr9+bSWROv1CIXVCuTv2/iJeiSaVam8xT2ZRtDGURkxETOcompehhjJz9UBANvqUBtH7QrTi94de1BeqteXAwfJf+Fc1g9cr4xPKS8z1HvC35b+UCZow25FYTD+TIZDfuF/qXWyEvUP215YKQ4OqaYkNKfeToQGzpYvBM/1EBUTprJ+HSgZP/UXhXO/LrEWkqvXqxGAnBz2PUU8MydCALtqsY/XaHH9CPUZ+06Yaax9v0QreUp4ZFM4a3A8WpwVr75fTgUfDZw4NPqACfi6h4kOsEF9gASZM4SRnouIL0rEkfgCKBNggAXggEGuOfAtX+xP188B+j/MkiJwjY5kf4zC32pinkueG5X54ITeVFSWpMJIFo1hqP2rqXuYn28uFs2JlDCnlx1qd11qJplVW58S9/39X2qKXKAzeNlifAI/qFh1m6etQkyvU3OSHmiKhVPagS1xEWxxr/wMeWrePtzCZQ4rlKL/v/2Ij1e948JY/35XtXL8wgOIE7oO+CkvF6AK7mWyRMxyn1DTSyYEUq6o4drFneBAU32Ll/jlnLyYVNR1AEPtg564WFjU="
			)

			const killMethodPool = []
			const specificAccidents = [
				"accident_drown",
				"accident_explosion",
				"accident_push",
				"accident_suspended_object",
				"accident_electric",
				"accident_burn",
				"injected_poison",
				"consumed_poison",
				"remote_explosive",
				"impact_explosive",
				"loud_explosive"
			]
			const basic = ["assaultrifle", "shotgun", "sniperrifle"]
			const silenced = ["silenced_assaultrifle", "silenced_shotgun", "silenced_sniperrifle"]
			const loud = ["loud_assaultrifle", "loud_shotgun", "loud_sniperrifle"]

			if (rouletteFilters.includes("specificAccidents", 0)) {
				killMethodPool.push.apply(killMethodPool, specificAccidents)
			}

			if (
				rouletteFilters.includes("specificFirearms", 0) &&
				selectedMission != ("LOCATION_ICA_FACILITY_SHIP" || "LOCATION_ICA_FACILITY")
			) {
				killMethodPool.push("pistol")
				killMethodPool.push("loud_pistol")
				killMethodPool.push("silenced_pistol")
				killMethodPool.push("smg")
				killMethodPool.push("loud_smg")
				killMethodPool.push("silenced_smg")
				killMethodPool.push.apply(killMethodPool, basic)
				killMethodPool.push.apply(killMethodPool, silenced)
				killMethodPool.push.apply(killMethodPool, loud)
			}

			if (rouletteFilters.includes("specificFirearms", 0) && selectedMission == "LOCATION_ICA_FACILITY") {
				killMethodPool.push("pistol")
				killMethodPool.push("loud_pistol")
				killMethodPool.push("silenced_pistol")
				killMethodPool.push("assaultrifle")
				killMethodPool.push("loud_assaultrifle")
			}

			if (rouletteFilters.includes("specificFirearms", 0) && selectedMission == "LOCATION_ICA_FACILITY_SHIP") {
				killMethodPool.push("pistol")
				killMethodPool.push("loud_pistol")
				killMethodPool.push("silenced_pistol")
				killMethodPool.push("assaultrifle")
				killMethodPool.push("loud_assaultrifle")
				killMethodPool.push("shotgun")
				killMethodPool.push("loud_shotgun")
			}

			if (rouletteFilters.includes("specificMelee", 0) && info.RouletteMeleeWeapons != [""]) {
				killMethodPool.push.apply(killMethodPool, info.RouletteMeleeWeapons)
				killMethodPool.push("fiberwire")
				killMethodPool.push("unarmed")
			}

			if (rouletteFilters.includes("rrBannedKills") && rouletteFilters.includes("specificFirearms")) {
				killMethodPool.push("pistol_elimination")
				killMethodPool.push("weapon_elimination")
			}

			if (
				rouletteFilters.includes("rrBannedKills") &&
				rouletteFilters.includes("specificFirearms") &&
				selectedMission != "LOCATION_ICA_FACILITY_SHIP" &&
				selectedMission != "LOCATION_ICA_FACILITY"
			) {
				killMethodPool.push("smg_elimination")
			}

			if (
				(selectedMission == "LOCATION_COLORADO" || selectedMission == "LOCATION_EDGY_FOX") &&
				rouletteFilters.includes("specificFirearms") &&
				!rouletteFilters.includes("specificMelee") &&
				!rouletteFilters.includes("specificAccidents")
			) {
				killMethodPool.push.apply(killMethodPool, specificAccidents)
				killMethodPool.push.apply(killMethodPool, info.RouletteMeleeWeapons)
				killMethodPool.push("fiberwire")
				killMethodPool.push("unarmed")
			}

			const disguisePool = info.RouletteDisguises

			// The following section randomizes kill methods and disguises

			const selectedKillMethodList = []
			const selectedDisguiseList = []
			const pacificationNumber = [1, 2, 3, 4]

			let bannedConditions = true

			function notMultipleLargeFirearms(array) {
				const largeFirearms = [
					"loud_smg",
					"assaultrifle",
					"loud_assaultrifle",
					"silenced_assaultrifle",
					"shotgun",
					"loud_shotgun",
					"silenced_shotgun",
					"sniperrifle",
					"loud_sniperrifle",
					"silenced_sniperrifle"
				]
				let largeFirearmCount = 0

				for (let i = 0; i < array.length; i++) {
					const testedForLargeFirearm = array[i]
					if (largeFirearms.includes(testedForLargeFirearm)) {
						largeFirearmCount++
						if (largeFirearmCount > 1) {
							return false
						}
					}
				}
				return true
			}

			function notMultiplePistols(array) {
				const pistols = ["pistol", "silenced_pistol", "loud_pistol", "pistol_elimination", "weapon_elimination"]
				let pistolCount = 0

				for (let o = 0; o < array.length; o++) {
					const testedForPistol = array[o]
					if (pistols.includes(testedForPistol)) {
						pistolCount++
						if (pistolCount > 1) {
							return false
						}
					}
				}
				return true
			}

			function notMultipleSmgs(array) {
				const smgs = ["smg", "silenced_smg", "loud_smg", "smg_elimination", "weapon_elimination"]
				let smgCount = 0

				for (let u = 0; u < array.length; u++) {
					const testedForSmg = array[u]
					if (smgs.includes(testedForSmg)) {
						smgCount++
						if (smgCount > 1) {
							return false
						}
					}
				}
				return true
			}

			function noOtherDuplicates(array) {
				const uniqueKillMethods = new Set(array)
				if (uniqueKillMethods.size != array.length) {
					uniqueKillMethods.clear()
					return false
				}
				return true
			}

			while (bannedConditions) {
				selectedKillMethodList.length = 0
				selectedDisguiseList.length = 0

				for (let a = 0; a <= info.RouletteTargetNumber; a++) {
					const selectedKillMethod = killMethodPool[getRandomIntWithSeed(0, killMethodPool.length - 1, seed++)]
					const selectedDisguise = disguisePool[getRandomIntWithSeed(0, disguisePool.length - 1, seed++)]
					selectedKillMethodList.push(selectedKillMethod)
					selectedDisguiseList.push(selectedDisguise)
				}

				let otherBannedConditions = false

				for (let a = 0; a <= info.RouletteTargetNumber; a++) {
					if (
						!rouletteFilters.includes("rrBannedKills") &&
						(([
							"052434e7-f451-462f-a9d7-13657cb047c0",
							"edad702b-5b37-4dc1-a47c-36a1588f1d3f",
							"0dfaea51-3c36-4722-9eff-f1e7ef139878",
							"94ab740b-b30f-4086-9aea-5c9c0de28456",
							"ee3f55b8-12f8-4245-8ef2-3022b4f6f120",
							"f65fff84-6cad-4a11-9a0a-b89430c03397",
							"963c2774-cb9a-4b0c-ab69-210b2405383b",
							"ee454990-0c4b-49e5-9572-a67887325283",
							"db21a429-add2-46fa-8176-540f846d89e0",
							"076f23cc-09d8-423f-b890-74020f53b1d6",
							"c7c9e213-16f9-4215-bf07-dd8f801ce3e0",
							"672a7a52-a08a-45cd-a061-ced6a7b8d8c4",
							"b8f0bf6c-4826-4de2-a785-2d139967e09c",
							"67f39ab8-c25f-48c3-84be-0ec495a553ec",
							"ad93e268-3d6e-4aba-bec0-607cb5451ac7",
							"7504b78e-e766-42fe-930c-c5640f5f507b",
							"0afcc59e-6d6e-433f-8404-7699df872c9d",
							"5bc06fb1-bfb3-48ef-94ae-6f18c16c1eee",
							"bd0689d6-07b4-4757-b8ee-cac19f1c9e16",
							"9571d196-8d67-4d94-8dad-6e2d970d7a91",
							"080efb03-a66a-401e-b6df-4eac496e9e2d",
							"967abcf9-2672-4e81-8fef-211aaa366747",
							"a7fd7a4f-2bee-4787-bc60-90f9dd64233b",
							"57907f04-329e-4faf-b753-7e95d5c2e085",
							"651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"
						].includes(info.RouletteTargetIds[a]) &&
							selectedKillMethodList[a] == "accident_burn") ||
							([
								"0dfaea51-3c36-4722-9eff-f1e7ef139878",
								"5b54d9fb-fa85-4302-a8d5-c5c5e97344c4",
								"1a8a827f-932e-49c0-a1b3-e3201795ae19",
								"00df867e-f27f-4904-8bc7-9504443ccb5a",
								"78f98c70-b7be-4578-9b6a-1c96a3e1ff1a",
								"c7c9e213-16f9-4215-bf07-dd8f801ce3e0",
								"7eb39f2d-1030-44d2-be82-6df608085ec0",
								"67f39ab8-c25f-48c3-84be-0ec495a553ec",
								"7504b78e-e766-42fe-930c-c5640f5f507b",
								"0afcc59e-6d6e-433f-8404-7699df872c9d",
								"bd0689d6-07b4-4757-b8ee-cac19f1c9e16",
								"9571d196-8d67-4d94-8dad-6e2d970d7a91",
								"967abcf9-2672-4e81-8fef-211aaa366747",
								"a7fd7a4f-2bee-4787-bc60-90f9dd64233b",
								"57907f04-329e-4faf-b753-7e95d5c2e085",
								"651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"
							].includes(info.RouletteTargetIds[a]) &&
								selectedKillMethodList[a] == "consumed_poison") ||
							([
								"b38b0b62-8071-4761-b2a5-2f635cd8da1b",
								"5b54d9fb-fa85-4302-a8d5-c5c5e97344c4",
								"963c2774-cb9a-4b0c-ab69-210b2405383b",
								"1a8a827f-932e-49c0-a1b3-e3201795ae19",
								"d94f3e83-36e3-453c-8d4b-28c93229826a",
								"076f23cc-09d8-423f-b890-74020f53b1d6",
								"78f98c70-b7be-4578-9b6a-1c96a3e1ff1a",
								"c7c9e213-16f9-4215-bf07-dd8f801ce3e0"
							].includes(info.RouletteTargetIds[a]) &&
								selectedKillMethodList[a] == "accident_drown") ||
							(["b38b0b62-8071-4761-b2a5-2f635cd8da1b", "1a8a827f-932e-49c0-a1b3-e3201795ae19"].includes(
								info.RouletteTargetIds[a]
							) &&
								selectedKillMethodList[a] == "accident_electric") ||
							([
								"00df867e-f27f-4904-8bc7-9504443ccb5a",
								"b87b242e-4ef4-42d8-94ed-17cbfc9009bf",
								"db21a429-add2-46fa-8176-540f846d89e0",
								"7eb39f2d-1030-44d2-be82-6df608085ec0",
								"67f39ab8-c25f-48c3-84be-0ec495a553ec"
							].includes(info.RouletteTargetIds[a]) &&
								selectedKillMethodList[a] == "b2321154-4520-4911-9d94-9256b85e0983") ||
							([
								"b87b242e-4ef4-42d8-94ed-17cbfc9009bf",
								"672a7a52-a08a-45cd-a061-ced6a7b8d8c4",
								"5bc06fb1-bfb3-48ef-94ae-6f18c16c1eee",
								"a7fd7a4f-2bee-4787-bc60-90f9dd64233b",
								"651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"
							].includes(info.RouletteTargetIds[a]) &&
								selectedKillMethodList[a] == "accident_suspended_object") ||
							(["672a7a52-a08a-45cd-a061-ced6a7b8d8c4", "b8f0bf6c-4826-4de2-a785-2d139967e09c"].includes(
								info.RouletteTargetIds[a]
							) &&
								selectedKillMethodList[a] == "b153112f-9cd1-4a49-a9c6-ba1a34f443ab") ||
							(["672a7a52-a08a-45cd-a061-ced6a7b8d8c4", "b8f0bf6c-4826-4de2-a785-2d139967e09c"].includes(
								info.RouletteTargetIds[a]
							) &&
								selectedKillMethodList[a] == "58dceb1c-d7db-41dc-9750-55e3ab87fdf0") ||
							(info.RouletteTargetIds[a] == "9571d196-8d67-4d94-8dad-6e2d970d7a91" &&
								selectedKillMethodList[a] == "accident_drown" &&
								selectedDisguiseList[a] == "c4146f27-81a9-42ef-b3c7-87a9d60b87fe") ||
							(info.RouletteTargetIds[a] == "ca31c88f-d15e-407b-8407-231f1b068402" &&
								![
									"accident_explosion",
									"accident_electric",
									"remote_explosive",
									"accident_burn",
									"consumed_poison"
								].includes(selectedKillMethodList[a]) &&
								selectedDisguiseList[a] == "fdb4aade-4d5f-47e2-896f-fc1addf64d52") ||
							(["ee3f55b8-12f8-4245-8ef2-3022b4f6f120", "f65fff84-6cad-4a11-9a0a-b89430c03397"].includes(
								info.RouletteTargetIds[a]
							) &&
								![
									"accident_explosion",
									"accident_electric",
									"remote_explosive",
									"accident_burn",
									"consumed_poison"
								].includes(selectedKillMethodList[a]) &&
								selectedDisguiseList[a] == "c5bf909f-66a5-4f19-9aee-aeb953172e45") ||
							(["7eb39f2d-1030-44d2-be82-6df608085ec0", "67f39ab8-c25f-48c3-84be-0ec495a553ec"].includes(
								info.RouletteTargetIds[a]
							) &&
								![
									"accident_explosion",
									"accident_electric",
									"remote_explosive",
									"accident_burn",
									"consumed_poison"
								].includes(selectedKillMethodList[a]) &&
								selectedDisguiseList[a] == "fae73e92-2307-4163-8e9f-30401ca884bf"))
					) {
						otherBannedConditions = true
					}
				}

				if (
					notMultipleLargeFirearms(selectedKillMethodList) &&
					notMultiplePistols(selectedKillMethodList) &&
					notMultipleSmgs(selectedKillMethodList) &&
					noOtherDuplicates(selectedKillMethodList) &&
					otherBannedConditions == false
				) {
					bannedConditions = false
				}
			}

			log(LogLevel.INFO, "[Roulette] Selected killmethods: " + selectedKillMethodList)
			log(LogLevel.INFO, "[Roulette] Selected disguises: " + selectedDisguiseList)

			// The following section generates objectives based on the randomized conditions

			const berlinVerificationObjective = {
				Id: "ece1b420-cbd4-442c-9a5d-0cc2caf6f2d7",
				Category: "primary",
				ObjectiveType: "setpiece",
				Image: "images/actors/mongoose_unknown_man.png",
				BriefingName: "Verify first 5 agent kills",
				BriefingText:
					"You eliminated an ICA Agent with a kill method / disguise combo that did not match the specified conditions.",
				LongBriefingText: "Eliminate 5 ICA Agents via the specified conditions",
				HUDTemplate: { display: "Verify first 5 agent kills" },
				Type: "statemachine",
				ForceShowOnLoadingScreen: false,
				ExcludeFromScoring: true,
				IsHidden: true,
				OnActive: {
					IfInProgress: { Visible: false },
					IfCompleted: { Visible: false },
					IfFailed: { Visible: false }
				},
				Definition: {
					Context: {
						KilledTargets: 0,
						Targets: ["252428ca-3f8e-4477-b2b9-58f18cff3e44"],
						PossibleTargets: [
							"252428ca-3f8e-4477-b2b9-58f18cff3e44",
							"abd1c0e7-e406-43bd-9185-419029c5bf3d",
							"922deccd-7fb4-45d9-ae3d-2cf11915c403",
							"b8e7e65b-587e-471b-894d-282cda6614d4",
							"2ab07903-e958-4af6-b01c-b62058745ce1",
							"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
							"633398ac-c4b4-4441-852d-ae6460172025",
							"eb024a5e-9580-49dc-a519-bb92c886f3b1",
							"1305c2e4-6394-4cfa-b873-22adbd0c9702",
							"f83376a4-6e56-4f2a-8122-151b272108fd",
							"8b29da09-461f-44d7-9042-d4fde829b9f2"
						]
					},
					States: {
						Start: {
							Kill: [
								{ Condition: { $eq: ["$Value.IsTarget", true] }, Actions: { $inc: "KilledTargets" } },
								{
									Condition: {
										$and: [
											{
												$inarray: {
													in: "$.PossibleTargets",
													"?": { $eq: ["$.#", "$Value.RepositoryId"] }
												}
											}
										]
									},
									Transition: "Failure"
								},
								{ Condition: { $eq: ["$.KilledTargets", 5] }, Transition: "Success" },
								{ Transition: "Start" }
							]
						}
					}
				}
			}
			let berlinVerificationObjectiveCondition

			const objectiveIdList = []

			for (let e = 0; e <= info.RouletteTargetNumber; e++) {
				const mainObjectiveId = randomUUID()
				const killMethodObjectiveId = randomUUID()
				const disguiseObjectiveId = randomUUID()

				objectiveIdList.push(`$${mainObjectiveId}`)
				objectiveIdList.push(`$${killMethodObjectiveId}`)

				const berlinNpcName = "$loc UI_ROULETTE_BERLIN_" + e

				let killDisplay

				const npcPartOne = "$($repository "
				const npcPartTwo = ").Name"

				let npcString

				if (selectedMission == "LOCATION_EDGY_FOX") {
					npcString = berlinNpcName
				} else {
					npcString = npcPartOne + info.RouletteTargetIds[e] + npcPartTwo
				}

				let weaponString

				if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e])) {
					const weaponPartOne = "$loc $($repository "
					const weaponPartTwo = ").Name_LOC"
					weaponString = weaponPartOne + selectedKillMethodList[e] + weaponPartTwo
				}

				let killMethodString

				if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e])) {
					killMethodString = weaponString
				} else {
					killMethodString = "$loc " + killLocKeys[selectedKillMethodList[e]]
				}

				const killMethodFailDisplay = { $loc: { key: "UI_ROULETTE_KILLMETHOD_FAIL", data: [killMethodString] } }

				let disguiseFailDisplay

				let berlinDesc

				if (rouletteFilters.includes("specificDisguises")) {
					objectiveIdList.push(`$${disguiseObjectiveId}`)

					let disguiseString
					if (selectedDisguiseList[e] == "suit") {
						disguiseString = "$loc UI_BRIEFING_CONDITION_HITMANSUIT"
					} else {
						const disguisePartOne = "$loc $($repository "
						const disguisePartTwo = ").Name"
						disguiseString = disguisePartOne + selectedDisguiseList[e] + disguisePartTwo
					}
					disguiseFailDisplay = { $loc: { key: "UI_ROULETTE_DISGUISE_FAIL", data: [disguiseString] } }

					if (selectedDisguiseList[e] == "suit") {
						killDisplay = {
							$loc: {
								key: "UI_ROULETTE_KILL_DISGUISED_VERBOSE_SUIT",
								data: [npcString, killMethodString, disguiseString]
							}
						}
					} else {
						killDisplay = {
							$loc: {
								key: "UI_ROULETTE_KILL_DISGUISED_VERBOSE",
								data: [npcString, killMethodString, disguiseString]
							}
						}
					}

					berlinDesc = {
						$loc: { key: "UI_ROULETTE_KILL_BERLIN_DISGUISED", data: [killMethodString, disguiseString] }
					}
				} else {
					killDisplay = { $loc: { key: "UI_ROULETTE_KILL_ANYDISGUISE", data: [npcString, killMethodString] } }
					berlinDesc = { $loc: { key: "UI_ROULETTE_KILL_BERLIN_ANYDISGUISE", data: killMethodString } }
				}

				let mainObjective

				if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7") {
					mainObjective = {
						Category: "primary",
						Type: "statemachine",
						OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
						OnActive: { IfCompleted: { Visible: true } },
						Definition: {
							Scope: "hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									"-": {
										Actions: {
											$pushunique: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"],
											$remove: ["Targets", info.RouletteTargetIds[e]]
										}
									},
									SierraLeftCar: {
										Actions: {
											$pushunique: ["Targets", info.RouletteTargetIds[e]],
											$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
										}
									},
									Pre_Kill: {
										Actions: {
											$pushunique: ["Targets", info.RouletteTargetIds[e]],
											$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
										}
									},
									Kill: [
										{
											Condition: {
												$and: [{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] }]
											},
											Transition: "Success"
										}
									]
								}
							}
						},
						Id: mainObjectiveId,
						HUDTemplate: { display: killDisplay },
						BriefingText: "",
						LongBriefingText: killDisplay,
						TargetConditions: []
					}
				} else if (info.RouletteTargetIds[e] == "ab48a89d-e8a7-4df4-ae72-f0fccaa65e7f") {
					mainObjective = {
						Category: "primary",
						Type: "statemachine",
						OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
						OnActive: { IfCompleted: { Visible: true } },
						Definition: {
							Scope: "hit",
							Context: { TargetEscaping: 1, Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									Kill: [
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									],
									Target_Leaving: [{ Actions: { $dec: "TargetEscaping" }, Transition: "TargetEscaping" }]
								},
								TargetEscaping: {
									Kill: [
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									],
									Target_Escape: { Transition: "Failure" }
								}
							}
						},
						Id: mainObjectiveId,
						HUDTemplate: { display: killDisplay },
						BriefingText: killDisplay,
						LongBriefingText: killDisplay,
						TargetConditions: []
					}
				} else if (
					info.RouletteTargetIds[e] == "57907f04-329e-4faf-b753-7e95d5c2e085" ||
					info.RouletteTargetIds[e] == "651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"
				) {
					mainObjective = {
						UpdateActivationWhileCompleted: true,
						Category: "primary",
						Type: "statemachine",
						OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
						OnActive: { IfCompleted: { Visible: true } },
						Definition: {
							Scope: "hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									Kill: [
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									]
								}
							}
						},
						Id: mainObjectiveId,
						HUDTemplate: { display: killDisplay },
						BriefingText: killDisplay,
						LongBriefingText: killDisplay,
						TargetConditions: []
					}
				} else if (
					["ballsack", "cunt", "asshole", "borisjohnson", "vladimirputin"].includes(info.RouletteTargetIds[e])
				) {
					mainObjective = {
						Category: "primary",
						ObjectiveType: "setpiece",
						Type: "statemachine",
						Definition: {
							ContextListeners: { Failure: { type: "custom", LongBriefingText: "balls" } },
							Context: {
								Targets: ["252428ca-3f8e-4477-b2b9-58f18cff3e44"],
								PossibleTargets: [
									"252428ca-3f8e-4477-b2b9-58f18cff3e44",
									"abd1c0e7-e406-43bd-9185-419029c5bf3d",
									"922deccd-7fb4-45d9-ae3d-2cf11915c403",
									"b8e7e65b-587e-471b-894d-282cda6614d4",
									"2ab07903-e958-4af6-b01c-b62058745ce1",
									"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
									"633398ac-c4b4-4441-852d-ae6460172025",
									"eb024a5e-9580-49dc-a519-bb92c886f3b1",
									"1305c2e4-6394-4cfa-b873-22adbd0c9702",
									"f83376a4-6e56-4f2a-8122-151b272108fd",
									"8b29da09-461f-44d7-9042-d4fde829b9f2"
								],
								PacifiedTargets: [],
								KilledTargets: 0
							},
							States: {
								Start: {
									Pacify: {
										Condition: { $eq: ["$Value.IsTarget", true] },
										Actions: { $pushunique: ["PacifiedTargets", "$Value.RepositoryId"] }
									},
									Kill: [
										{
											Condition: { $eq: ["$Value.IsTarget", true] },
											Actions: { $inc: "KilledTargets" }
										},
										{
											Condition: {
												$and: [
													{
														$inarray: {
															in: "$.PossibleTargets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												]
											},
											Transition: "Success"
										}
									]
								},
								Success: {
									Kill: [
										{
											Condition: {
												$and: [
													{
														$inarray: {
															in: "$.PossibleTargets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													},
													{ $lt: ["$.KilledTargets", 6] }
												]
											},
											Transition: "Failure"
										}
									]
								}
							}
						},
						Id: mainObjectiveId,
						Image: "images/actors/ica-agents.png",
						BriefingName: berlinNpcName,
						BriefingText: berlinDesc,
						LongBriefingText: berlinDesc,
						HUDTemplate: { display: killDisplay }
					}
				} else {
					mainObjective = {
						Category: "primary",
						Type: "statemachine",
						OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
						OnActive: { IfCompleted: { Visible: true } },
						Definition: {
							Scope: "hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									Kill: [
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									]
								}
							}
						},
						Id: mainObjectiveId,
						HUDTemplate: { display: killDisplay },
						BriefingText: killDisplay,
						LongBriefingText: killDisplay,
						TargetConditions: []
					}
				}

				let mainObjectiveKillMethodCondition

				if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e], 0)) {
					mainObjectiveKillMethodCondition = {
						Type: "weapon",
						RepositoryId: selectedKillMethodList[e],
						HardCondition: true,
						ObjectiveId: killMethodObjectiveId
					}
				} else {
					mainObjectiveKillMethodCondition = {
						Type: "killmethod",
						KillMethod: selectedKillMethodList[e],
						HardCondition: true,
						ObjectiveId: killMethodObjectiveId
					}
				}

				if (selectedMission != "LOCATION_EDGY_FOX") {
					mainObjective.TargetConditions.push(mainObjectiveKillMethodCondition)
				}

				let killMethodObjectiveCondition

				let firearmBroad

				if (
					selectedKillMethodList[e] == "silenced_assaultrifle" ||
					selectedKillMethodList[e] == "loud_assaultrifle"
				) {
					firearmBroad = "assaultrifle"
				} else if (selectedKillMethodList[e] == "silenced_shotgun" || selectedKillMethodList[e] == "loud_shotgun") {
					firearmBroad = "shotgun"
				} else if (
					selectedKillMethodList[e] == "silenced_sniperrifle" ||
					selectedKillMethodList[e] == "loud_sniperrifle"
				) {
					firearmBroad = "sniperrifle"
				}

				if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e], 0)) {
					killMethodObjectiveCondition = { $eq: ["$Value.KillItemRepositoryId", selectedKillMethodList[e]] }
				} else if (
					selectedKillMethodList[e] == "fiberwire" ||
					selectedKillMethodList[e] == "unarmed" ||
					basic.includes(selectedKillMethodList[e], 0)
				) {
					killMethodObjectiveCondition = { $eq: ["$Value.KillMethodBroad", selectedKillMethodList[e]] }
				} else if (
					(specificAccidents.includes(selectedKillMethodList[e], 0) &&
						!["impact_explosive", "remote_explosive", "loud_explosive", "accident_burn"].includes(
							selectedKillMethodList[e]
						)) ||
					(selectedKillMethodList[e] == "accident_burn" &&
						![
							"LOCATION_COASTALTOWN",
							"LOCATION_COASTALTOWN_MOVIESET",
							"LOCATION_COASTALTOWN_NIGHT",
							"LOCATION_COASTALTOWN_EBOLA",
							"LOCATION_THEENFORCER",
							"LOCATION_HOKKAIDO",
							"LOCATION_THECONTROLLER",
							"LOCATION_HOKKAIDO_MAMUSHI",
							"LOCATION_HOKKAIDO_FLU",
							"LOCATION_NORTHAMERICA",
							"LOCATION_NORTHAMERICA_GARTERSNAKE",
							"LOCATION_EDGY_FOX"
						].includes(selectedMission))
				) {
					killMethodObjectiveCondition = { $eq: ["$Value.KillMethodStrict", selectedKillMethodList[e]] }
				} else if (
					selectedKillMethodList[e] == "accident_burn" &&
					[
						"LOCATION_COASTALTOWN",
						"LOCATION_COASTALTOWN_MOVIESET",
						"LOCATION_COASTALTOWN_NIGHT",
						"LOCATION_COASTALTOWN_EBOLA",
						"LOCATION_THEENFORCER",
						"LOCATION_HOKKAIDO",
						"LOCATION_THECONTROLLER",
						"LOCATION_HOKKAIDO_MAMUSHI",
						"LOCATION_HOKKAIDO_FLU",
						"LOCATION_NORTHAMERICA",
						"LOCATION_NORTHAMERICA_GARTERSNAKE",
						"LOCATION_EDGY_FOX"
					].includes(selectedMission)
				) {
					killMethodObjectiveCondition = {
						$or: [
							{ $eq: ["$Value.KillMethodStrict", "accident_burn"] },
							{
								$and: [
									{ $eq: ["$Value.KillClass", "unknown"] },
									{ $inarray: { in: "$Value.DamageEvents", "?": { $eq: ["$.#", "InCloset"] } } }
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "pistol") {
					killMethodObjectiveCondition = {
						$or: [
							{ $eq: ["$Value.KillMethodBroad", "pistol"] },
							{ $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
						]
					}
				} else if (selectedKillMethodList[e] == "silenced_pistol") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.WeaponSilenced", true] },
							{
								$or: [
									{ $eq: ["$Value.KillMethodBroad", "pistol"] },
									{ $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "loud_pistol") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.WeaponSilenced", false] },
							{
								$or: [
									{ $eq: ["$Value.KillMethodBroad", "pistol"] },
									{ $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "smg") {
					killMethodObjectiveCondition = {
						$or: [
							{ $eq: ["$Value.KillMethodBroad", "smg"] },
							{
								$and: [
									{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
									{ $eq: ["$Value.KillItemCategory", "smg"] }
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "silenced_smg") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.WeaponSilenced", true] },
							{
								$or: [
									{ $eq: ["$Value.KillMethodBroad", "smg"] },
									{
										$and: [
											{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
											{ $eq: ["$Value.KillItemCategory", "smg"] }
										]
									}
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "loud_smg") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.WeaponSilenced", false] },
							{
								$or: [
									{ $eq: ["$Value.KillMethodBroad", "smg"] },
									{
										$and: [
											{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
											{ $eq: ["$Value.KillItemCategory", "smg"] }
										]
									}
								]
							}
						]
					}
				} else if (silenced.includes(selectedKillMethodList[e], 0)) {
					killMethodObjectiveCondition = {
						$and: [{ $eq: ["$Value.WeaponSilenced", true] }, { $eq: ["$Value.KillMethodBroad", firearmBroad] }]
					}
				} else if (loud.includes(selectedKillMethodList[e], 0)) {
					killMethodObjectiveCondition = {
						$and: [{ $eq: ["$Value.WeaponSilenced", false] }, { $eq: ["$Value.KillMethodBroad", firearmBroad] }]
					}
				} else if (selectedKillMethodList[e] == "smg_elimination") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
							{ $eq: ["$Value.KillItemCategory", "smg"] }
						]
					}
				} else if (selectedKillMethodList[e] == "pistol_elimination") {
					killMethodObjectiveCondition = { $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
				} else if (selectedKillMethodList[e] == "weapon_elimination") {
					killMethodObjectiveCondition = {
						$or: [
							{
								$and: [
									{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
									{ $eq: ["$Value.KillItemCategory", "smg"] }
								]
							},
							{ $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
						]
					}
				} else if (selectedKillMethodList[e] == "impact_explosive") {
					killMethodObjectiveCondition = {
						$and: [
							{
								$inarray: {
									"?": { $eq: ["$.#", "$Value.KillItemRepositoryId"] },
									in: [
										"2a493cf9-7cb1-4aad-b892-17abf8b329f4",
										"485f8902-b7e3-4916-8b90-ea7cebb305de",
										"c95c55aa-34e5-42bd-bf27-32be3978b269",
										"af8a7b6c-692c-4a76-b9bc-2b91ce32bcbc",
										"c82fefa7-febe-46c8-90ec-c945fbef0cb4",
										"a83349bf-3d9c-43ec-92ee-c8c98cbeabc1"
									]
								}
							},
							{ $eq: ["$Value.KillMethodBroad", "explosive"] }
						]
					}
				} else if (selectedKillMethodList[e] == "remote_explosive") {
					killMethodObjectiveCondition = {
						$and: [
							{
								$not: {
									$inarray: {
										"?": { $eq: ["$.#", "$Value.KillItemRepositoryId"] },
										in: [
											"2a493cf9-7cb1-4aad-b892-17abf8b329f4",
											"485f8902-b7e3-4916-8b90-ea7cebb305de",
											"c95c55aa-34e5-42bd-bf27-32be3978b269",
											"af8a7b6c-692c-4a76-b9bc-2b91ce32bcbc",
											"c82fefa7-febe-46c8-90ec-c945fbef0cb4",
											"a83349bf-3d9c-43ec-92ee-c8c98cbeabc1"
										]
									}
								}
							},
							{ $eq: ["$Value.KillMethodBroad", "explosive"] }
						]
					}
				} else if (selectedKillMethodList[e] == "loud_explosive") {
					killMethodObjectiveCondition = {
						$and: [
							{
								$not: {
									$inarray: {
										"?": { $eq: ["$.#", "$Value.KillItemRepositoryId"] },
										in: [
											"fc715a9a-3bf1-4768-bd67-0def61b92551",
											"9d5daae3-10c8-4f03-a85d-9bd92861a672",
											"293af6cc-dd8d-4641-b650-14cdfd00f1de"
										]
									}
								}
							},
							{ $eq: ["$Value.KillMethodBroad", "explosive"] }
						]
					}
				}

				if (selectedMission == "LOCATION_EDGY_FOX") {
					mainObjective.Definition.States.Start.Kill[1].Condition.$and.push(killMethodObjectiveCondition)
					mainObjective.Definition.States.Success.Kill[0].Condition.$and.push(killMethodObjectiveCondition)
				}

				let killMethodObjective

				if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7") {
					killMethodObjective = {
						Type: "statemachine",
						Id: killMethodObjectiveId,
						BriefingText: killMethodFailDisplay,
						Category: "primary",
						Definition: {
							Scope: "Hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									"-": {
										Actions: {
											$pushunique: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"],
											$remove: ["Targets", info.RouletteTargetIds[e]]
										}
									},
									SierraLeftCar: {
										Actions: {
											$pushunique: ["Targets", info.RouletteTargetIds[e]],
											$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
										}
									},
									Pre_Kill: {
										Actions: {
											$pushunique: ["Targets", info.RouletteTargetIds[e]],
											$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
										}
									},
									SniperKillSierraCar: { Actions: { $inc: "SniperKillAchieved" } },
									Kill: [
										{
											Condition: {
												$and: [
													{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
													killMethodObjectiveCondition
												]
											},
											Transition: "Success"
										},
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Failure"
										}
									]
								}
							}
						}
					}
				} else {
					killMethodObjective = {
						Type: "statemachine",
						Id: killMethodObjectiveId,
						BriefingText: killMethodFailDisplay,
						Category: "primary",
						Definition: {
							Scope: "Hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									Kill: [
										{
											Condition: {
												$and: [
													{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
													killMethodObjectiveCondition
												]
											},
											Transition: "Success"
										},
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Failure"
										}
									]
								}
							}
						}
					}
				}

				if (rouletteFilters.includes("specificDisguises", 0)) {
					let mainObjectiveDisguiseCondition
					let disguiseObjectiveCondition

					if (selectedDisguiseList[e] == "suit") {
						disguiseObjectiveCondition = { $eq: ["$Value.OutfitIsHitmanSuit", true] }
						mainObjectiveDisguiseCondition = {
							Type: "hitmansuit",
							RepositoryId: "0c90c861-48b2-4058-9785-9e577006f3b4",
							HardCondition: true,
							ObjectiveId: disguiseObjectiveId
						}
					} else {
						disguiseObjectiveCondition = {
							$inarray: { "?": { $eq: ["$.#", "$Value.OutfitRepositoryId"] }, in: [selectedDisguiseList[e]] }
						}
						mainObjectiveDisguiseCondition = {
							Type: "disguise",
							RepositoryId: selectedDisguiseList[e],
							HardCondition: true,
							ObjectiveId: disguiseObjectiveId
						}
					}

					if (selectedMission == "LOCATION_EDGY_FOX") {
						mainObjective.Definition.States.Start.Kill[1].Condition.$and.push(disguiseObjectiveCondition)
						mainObjective.Definition.States.Success.Kill[0].Condition.$and.push(disguiseObjectiveCondition)
						berlinVerificationObjectiveCondition = {
							$not: { $and: [disguiseObjectiveCondition, killMethodObjectiveCondition] }
						}
					} else {
						mainObjective.TargetConditions.push(mainObjectiveDisguiseCondition)
					}

					let disguiseObjective

					if (selectedMission != "LOCATION_EDGY_FOX") {
						if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7") {
							disguiseObjective = {
								Type: "statemachine",
								Id: disguiseObjectiveId,
								BriefingText: disguiseFailDisplay,
								category: "primary",
								Definition: {
									Scope: "Hit",
									Context: { Targets: [info.RouletteTargetIds[e]] },
									States: {
										Start: {
											"-": {
												Actions: {
													$pushunique: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"],
													$remove: ["Targets", info.RouletteTargetIds[e]]
												}
											},
											SierraLeftCar: {
												Actions: {
													$pushunique: ["Targets", info.RouletteTargetIds[e]],
													$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
												}
											},
											Pre_Kill: {
												Actions: {
													$pushunique: ["Targets", info.RouletteTargetIds[e]],
													$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
												}
											},
											Kill: [
												{
													Condition: {
														$and: [
															disguiseObjectiveCondition,
															{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] }
														]
													},
													Transition: "Success"
												},
												{
													Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
													Transition: "Failure"
												}
											]
										}
									}
								}
							}
						} else {
							disguiseObjective = {
								Type: "statemachine",
								Id: disguiseObjectiveId,
								BriefingText: disguiseFailDisplay,
								category: "primary",
								Definition: {
									Scope: "Hit",
									Context: { Targets: [info.RouletteTargetIds[e]] },
									States: {
										Start: {
											Kill: [
												{
													Condition: {
														$and: [
															disguiseObjectiveCondition,
															{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] }
														]
													},
													Transition: "Success"
												},
												{
													Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
													Transition: "Failure"
												}
											]
										}
									}
								}
							}
						}

						baseContract.Data.Objectives.push(disguiseObjective)
					}
				} else {
					if (selectedMission == "LOCATION_EDGY_FOX") {
						berlinVerificationObjectiveCondition = { $not: killMethodObjectiveCondition }
					}
				}

				baseContract.Data.Objectives.push(mainObjective)

				if (selectedMission != "LOCATION_EDGY_FOX") {
					baseContract.Data.Objectives.push(killMethodObjective)
				} else {
					berlinVerificationObjective.Definition.States.Start.Kill[1].Condition.$and.push(
						berlinVerificationObjectiveCondition
					)
				}

				let pacificationBanned

				if (
					([
						"5b54d9fb-fa85-4302-a8d5-c5c5e97344c4",
						"963c2774-cb9a-4b0c-ab69-210b2405383b",
						"076f23cc-09d8-423f-b890-74020f53b1d6",
						"78f98c70-b7be-4578-9b6a-1c96a3e1ff1a",
						"c7c9e213-16f9-4215-bf07-dd8f801ce3e0",
						"967abcf9-2672-4e81-8fef-211aaa366747",
						"ballsack",
						"cunt",
						"asshole",
						"borisjohnson",
						"vladimirputin"
					].includes(info.RouletteTargetIds[e]) &&
						(selectedKillMethodList[e] == "loud_pistol" ||
							selectedKillMethodList[e] == "loud_smg" ||
							loud.includes(selectedKillMethodList[e]))) ||
					selectedMission == "LOCATION_EDGY_FOX"
				) {
					pacificationBanned = true
				} else {
					pacificationBanned = false
				}

				if (!rouletteFilters.includes("rrBannedKills") && pacificationBanned == true) {
					// do fucking nothing
				} else if (!specificAccidents.includes(selectedKillMethodList[e]) && pacificationBanned == false) {
					const selectedPacificationNumber =
						pacificationNumber[getRandomIntWithSeed(0, pacificationNumber.length - 1, seed++)]
					if (selectedPacificationNumber == "4") {
						const pacificationObjectiveId = randomUUID()
						const pacificationObjective = {
							Type: "statemachine",
							Id: pacificationObjectiveId,
							ObjectiveType: "setpiece",
							Image: "images/contracts/gamechangers/gamechanger_global_nopacifications.jpg",
							BriefingName: "$loc UI_ROULETTE_NOKO_TITLE",
							BriefingText: { $loc: { key: "UI_ROULETTE_NOKO_DESC", data: [npcString] } },
							LongBriefingText: { $loc: { key: "UI_ROULETTE_NOKO_LONGDESC", data: [npcString] } },
							Category: "primary",
							HUDTemplate: {
								display: { $loc: { key: "UI_ROULETTE_NOKO_DESC", data: [npcString] } },
								iconType: 7
							},
							Definition: {
								display: { iconType: 7 },
								Scope: "session",
								States: {
									Start: {
										Pacify: {
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Failure"
										},
										Kill: {
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									}
								}
							}
						}
						baseContract.Data.Objectives.push(pacificationObjective)
					}
				}
			}

			if (selectedMission == "LOCATION_EDGY_FOX") {
				baseContract.Data.Objectives.push(berlinVerificationObjective)
			}

			// Handling for Soders objective

			const sodersKillMethodPool = [
				"pistol",
				"loud_pistol",
				"silenced_pistol",
				"smg",
				"loud_smg",
				"silenced_smg",
				"assaultrifle",
				"loud_assaultrifle",
				"silenced_assaultrifle",
				"shotgun",
				"loud_shotgun",
				"silenced_shotgun",
				"sniperrifle",
				"loud_sniperrifle",
				"silenced_sniperrifle",
				"throwheart",
				"shootheart",
				"electrocution",
				"explosion",
				"stemcells",
				"spidermachine"
			]

			if (selectedMission == "LOCATION_HOKKAIDO") {
				const selectedSodersKillMethod =
					sodersKillMethodPool[getRandomIntWithSeed(0, sodersKillMethodPool.length - 1, seed++)]

				const selectedSodersDisguise = disguisePool[getRandomIntWithSeed(0, disguisePool.length - 1, seed++)]

				const sodersObjectiveId = randomUUID()

				let pushedSodersKillMethod

				if (
					[
						"pistol",
						"loud_pistol",
						"silenced_pistol",
						"smg",
						"loud_smg",
						"silenced_smg",
						"assaultrifle",
						"loud_assaultrifle",
						"silenced_assaultrifle",
						"shotgun",
						"loud_shotgun",
						"silenced_shotgun",
						"sniperrifle",
						"loud_sniperrifle",
						"silenced_sniperrifle",
						"explosion"
					].includes(selectedSodersKillMethod)
				) {
					pushedSodersKillMethod = "Body_Kill"
				} else if (selectedSodersKillMethod == "throwheart" || selectedSodersKillMethod == "shootheart") {
					pushedSodersKillMethod = "Heart_Kill"
				} else if (selectedSodersKillMethod == "electrocution") {
					pushedSodersKillMethod = "Soder_Electrocuted"
				} else if (selectedSodersKillMethod == "stemcells") {
					pushedSodersKillMethod = "Poison_Kill"
				} else if (selectedSodersKillMethod == "spidermachine") {
					pushedSodersKillMethod = "Spidermachine_Kill"
				}

				let sodersCondition1

				if (rouletteFilters.includes("specificDisguises", 0) && selectedSodersDisguise != "suit") {
					sodersCondition1 = {
						Condition: {
							$and: [
								{ $eq: ["$.CurrentDisguise", selectedSodersDisguise] },
								{ $eq: ["$Value.Event_metricvalue", pushedSodersKillMethod] }
							]
						},
						Transition: "Success"
					}
				} else if (rouletteFilters.includes("specificDisguises", 0) && selectedSodersDisguise == "suit") {
					sodersCondition1 = {
						Condition: {
							$and: [
								{
									$not: {
										$any: {
											"?": { $eq: ["$.#", "$.CurrentDisguise"] },
											in: [
												"c98a6467-5dd9-4041-8bff-119445750d4d",
												"52992428-8884-48db-9764-e486d17d4804",
												"d6bbbe57-8cc8-45ed-b1cb-d1f9477c4b61",
												"d9e0fbe7-ff74-4030-bed6-5a33a01acead",
												"25406dac-d206-48c7-a6df-dffb887c9227",
												"a8191fb6-9a6d-4145-8baf-d786e6f392b7",
												"3d4424a3-23f9-4cfe-b225-2e06c17d780b",
												"6a25f81d-cf2e-4e47-9b15-0f712a3f71d9",
												"5270225d-797a-43f8-8435-078ae0d92249",
												"f6f53c39-17f9-48cf-9594-7a696b036d61",
												"b8deb948-a0a9-4dcb-9df4-1c2ecd29765f",
												"b00380d9-3f84-4484-8bd6-39c0872da414",
												"427bac46-50b4-4470-9b0e-478efcd37793",
												"f4ea7065-d32b-4a97-baf9-98072a9c8128",
												"b8dbb7b6-fef9-4782-923f-ddebc573625e",
												"06456d4d-da36-4008-bea5-c0b985a565f5",
												"8e01f48f-ef06-448c-9d22-5d58c4414968",
												"5946924c-958d-48f4-ada3-86beb58aa778"
											]
										}
									}
								},
								{ $eq: ["$Value.Event_metricvalue", pushedSodersKillMethod] }
							]
						},
						Transition: "Success"
					}
				} else {
					sodersCondition1 = {
						Condition: { $eq: ["$Value.Event_metricvalue", pushedSodersKillMethod] },
						Transition: "Success"
					}
				}

				const sodersCondition2 = {
					Condition: { $eq: ["$Value.Event_metricvalue", pushedSodersKillMethod] },
					Transition: "Failure"
				}

				let sodersBriefing
				let sodersKillDisplay

				killMethodString = "$loc " + killLocKeys[selectedSodersKillMethod]

				if (rouletteFilters.includes("specificDisguises")) {
					let disguiseString
					if (selectedSodersDisguise == "suit") {
						disguiseString = "$loc UI_BRIEFING_CONDITION_HITMANSUIT"
					} else {
						const disguisePartOne = "$loc $($repository "
						const disguisePartTwo = ").Name"
						disguiseString = disguisePartOne + selectedSodersDisguise + disguisePartTwo
					}
					sodersBriefing = {
						$loc: { key: "UI_ROULETTE_SODERS_BRIEFING", data: [killMethodString, disguiseString] }
					}
					sodersKillDisplay = {
						$loc: {
							key: "UI_ROULETTE_KILL_DISGUISED",
							data: [
								"$($repository 5651198f-9ef7-4f3c-908b-a570f1cd64e2).Name",
								killMethodString,
								disguiseString
							]
						}
					}
				} else {
					sodersBriefing = { $loc: { key: "UI_ROULETTE_SODERS_ANYDISGUISE", data: [killMethodString] } }
					sodersKillDisplay = {
						$loc: {
							key: "UI_ROULETTE_KILL_ANYDISGUISE",
							data: ["$($repository 5651198f-9ef7-4f3c-908b-a570f1cd64e2).Name", killMethodString]
						}
					}
				}

				const sodersObjective = {
					Category: "primary",
					ObjectiveType: "setpiece",
					Image: "images/actors/Snowcrane_erich_soders_briefing.jpg",
					DisplayAsKillObjective: false,
					ForceShowOnLoadingScreen: true,
					Type: "statemachine",
					Definition: {
						Context: {
							CurrentDisguise: "unknown",
							TrackDisguiseChanges: true,
							Targets: ["5651198f-9ef7-4f3c-908b-a570f1cd64e2"],
							TargetOpportunities: [
								"d2e5bf2d-b6cd-474f-88b1-6aa0c7e641c3",
								"dd0ef769-afd7-4754-8058-0677b958d91a",
								"b3a982f1-2773-4a97-8492-614b897a8f98",
								"15af2544-833e-459e-9de9-39c109b6f732"
							]
						},
						States: {
							Start: {
								StartingSuit: { Actions: { $set: ["CurrentDisguise", "$Value"] } },
								OpportunityEvents: {
									Condition: {
										$and: [
											{ $eq: ["$Value.Event", "Disabled"] },
											{
												$inarray: {
													in: "$.TargetOpportunities",
													"?": { $eq: ["$.#", "$Value.RepositoryId"] }
												}
											}
										]
									},
									Actions: { $set: ["TrackDisguiseChanges", false] }
								},
								Disguise: {
									Condition: { $eq: ["$.TrackDisguiseChanges", true] },
									Actions: { $set: ["CurrentDisguise", "$Value"] }
								},
								Level_Setup_Events: [
									sodersCondition1,
									sodersCondition2,
									{
										Condition: {
											$any: {
												"?": { $eq: ["$.#", "$Value.Event_metricvalue"] },
												in: [
													"Heart_Kill",
													"Soder_Electrocuted",
													"Poison_Kill",
													"Spidermachine_kill",
													"Body_Kill"
												]
											}
										},
										Transition: "Failure"
									}
								]
							}
						}
					},
					Id: sodersObjectiveId,
					BriefingName: {
						$loc: {
							key: "UI_ROULETTE_SODERSNAME",
							data: "$($repository 5651198f-9ef7-4f3c-908b-a570f1cd64e2).Name"
						}
					},
					BriefingText: sodersBriefing,
					LongBriefingText: sodersBriefing,
					HUDTemplate: { display: sodersKillDisplay }
				}

				baseContract.Data.Objectives.splice(0, 0, sodersObjective)
			}

			// Handling for other extra objectives

			function additionalObjectives(selectedMission) {
				switch (selectedMission) {
					case "LOCATION_ICA_FACILITY_SHIP":
					case "LOCATION_ICA_FACILITY":
					case "LOCATION_PARIS":
					case "LOCATION_PARIS_NOEL":
					case "LOCATION_COASTALTOWN_MOVIESET":
					case "LOCATION_COASTALTOWN_NIGHT":
					case "LOCATION_MARRAKECH":
					case "LOCATION_BANGKOK":
					case "LOCATION_BANGKOK_ZIKA":
					case "LOCATION_COLORADO":
					case "LOCATION_HOKKAIDO_MAMUSHI":
					case "LOCATION_MIAMI_COTTONMOUTH":
					case "LOCATION_COLOMBIA":
					case "LOCATION_MUMBAI_KINGCOBRA":
					case "LOCATION_NORTHAMERICA_GARTERSNAKE":
					case "LOCATION_OPULENT_STINGRAY":
						break
					case "LOCATION_COASTALTOWN":
						return [
							{
								Id: "e15b5171-2b12-4966-9339-3344042f9867",
								ObjectiveType: "setpiece",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/octopus/Contract_Octopus_Virus_ObjectiveTile.jpg",
								BriefingName: "$loc UI_CONTRACT_OCTOPUS_VIRUS_BRIEFING_NAME",
								LongBriefingText: "$loc UI_CONTRACT_OCTOPUS_VIRUS_BRIEFING_DESC",
								Category: "primary",
								HUDTemplate: { display: "$loc UI_CONTRACT_OCTOPUS_OBJ_2" },
								BriefingText: "$loc UI_CONTRACT_OCTOPUS_OBJ_2",
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["53629764-635d-4d11-b671-7ba9b5a03298"] },
									States: { Start: { VirusDestroyed: [{ Transition: "Success" }] } }
								}
							},
							{
								Id: "5ff67d0f-9fcc-4775-ad60-364e69571388",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_OCTOPUS_FAIL_SILVIO_ESCAPED",
								HUDTemplate: { display: "$loc UI_CONTRACT_OCTOPUS_OBJ_3" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { SilvioSeaplaneEscaping: { Transition: "EscapeCountdownStart" } },
										EscapeCountdownStart: {
											$timer: { Condition: { $after: 90 }, Transition: "Failure" },
											Kill: [
												{
													Condition: {
														$eq: ["$Value.RepositoryId", "0dfaea51-3c36-4722-9eff-f1e7ef139878"]
													},
													Transition: "Success"
												}
											]
										}
									}
								}
							}
						]
					case "LOCATION_COASTALTOWN_EBOLA":
						return [
							{
								Id: "f6d7ccfd-6f0b-4e01-b80f-982c051c4c8e",
								Category: "primary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/whitespider/002_ebola/WS_Ebola_Virus_Sample.jpg",
								BriefingName: "$loc UI_CONTRACT_EBOLA_OBJ_3_TITLE",
								BriefingText: "$loc UI_CONTRACT_EBOLA_OBJ_3_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_EBOLA_OBJ_3" },
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["8521184b-4899-4e63-b9d0-e0bf830706a3"] },
									States: {
										Start: {
											ItemPickedUp: {
												Condition: {
													$eq: ["$Value.RepositoryId", "8521184b-4899-4e63-b9d0-e0bf830706a3"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_MARRAKECH_NIGHT":
						return [
							{
								Id: "341c93cc-05b5-45df-8b32-17ffa44e29ac",
								Category: "primary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/unlockables/item_perspective_74a4f6ee-b465-437c-bef9-3a67c9932853_0.jpg",
								BriefingName: "$loc UI_CONTRACT_PYTHON_OBJ_DOCS_DESC_SHORT",
								BriefingText: "$loc UI_CONTRACT_PYTHON_OBJ_DOCS_NAME",
								LongBriefingText: "$loc UI_CONTRACT_PYTHON_OBJ_DOCS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_PYTHON_OBJ_DOCS_NAME" },
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["74a4f6ee-b465-437c-bef9-3a67c9932853"] },
									States: {
										Start: {
											ItemPickedUp: {
												Condition: {
													$eq: ["$Value.RepositoryId", "74a4f6ee-b465-437c-bef9-3a67c9932853"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_HOKKAIDO":
						return [
							{
								Id: "5b1534ef-7848-440c-855a-d2635663dd74",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_SNOWCRANE_FAIL_ESCAPE",
								HUDTemplate: { display: "$loc UI_CONTRACT_SNOWCRANE_OBJ_ESCAPE" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { TargetEscapeStarted: { Transition: "Countdown" } },
										Countdown: {
											TargetEscapeFoiled: { Transition: "Success" },
											$timer: { Condition: { $after: 45 }, Transition: "Failure" },
											Kill: {
												Condition: {
													$eq: ["$Value.RepositoryId", "9bebb40a-3746-4ba2-8bfc-a1fcabaec72c"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_HOKKAIDO_FLU":
						return [
							{
								Id: "b8ffc636-4f9a-49b5-8293-98839a6ca202",
								ObjectiveType: "custom",
								IgnoreIfInactive: true,
								OnActive: { IfCompleted: { Visible: false } },
								OnInactive: { IfCompleted: { State: "Completed" } },
								Image: "images/contracts/whitespider/004_flu/Eliminate_Infected_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD",
								BriefingText: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ",
								Category: "primary",
								HUDTemplate: { display: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ", iconType: 19 },
								Type: "statemachine",
								Definition: {
									ContextListeners: {
										TargetsCounter: {
											type: "objective-counter",
											header: "UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD"
										}
									},
									Context: { KilledActors: [], Targets: [], TargetsCounter: 0 },
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: {
											TargetPicked: [
												{
													Condition: {
														$not: {
															$eq: [
																"3798fcf3-4e33-40db-a8a2-c160a3ec55bf",
																"01822ba2-7b3b-4bbd-a9f3-cf8006ba945a"
															]
														}
													},
													Actions: {
														$inc: "TargetsCounter",
														$pushunique: ["Targets", "$Value.RepositoryId"]
													},
													Transition: "TargetPicked"
												}
											]
										},
										TargetPicked: {
											TargetPicked: [
												{
													Condition: {
														$not: {
															$eq: [
																"3798fcf3-4e33-40db-a8a2-c160a3ec55bf",
																"01822ba2-7b3b-4bbd-a9f3-cf8006ba945a"
															]
														}
													},
													Actions: {
														$inc: "TargetsCounter",
														$pushunique: ["Targets", "$Value.RepositoryId"]
													}
												}
											],
											Kill: [
												{ Actions: { $pushunique: ["KilledActors", "$Value.RepositoryId"] } },
												{
													Actions: { $dec: "TargetsCounter" },
													Condition: {
														$inarray: {
															in: "$.Targets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												},
												{
													Condition: {
														$all: {
															in: "$.Targets",
															"?": {
																$any: { in: "$.KilledActors", "?": { $eq: ["$.#", "$.##"] } }
															}
														}
													},
													Transition: "Success"
												}
											],
											ContractLoad: [{ Actions: { $set: ["TargetsCounter", "$.TargetsCounter"] } }]
										}
									}
								}
							},
							{
								Id: "2c22eb96-bad8-4514-83c4-eece9c2c5988",
								ObjectiveType: "custom",
								IgnoreIfInactive: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: true }
								},
								Image: "images/contracts/whitespider/004_flu/Eliminate_Infected_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD",
								BriefingText: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ",
								ExcludeFromScoring: true,
								Category: "secondary",
								HUDTemplate: { display: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ", iconType: 19 },
								Type: "statemachine",
								Definition: {
									ContextListeners: {
										TotalTargetsCounter: {
											type: "objective-counter",
											header: "UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD"
										}
									},
									Context: { TotalTargetsCounter: 0 },
									States: {
										Start: {
											TargetPicked: [{ Actions: { $inc: "TotalTargetsCounter" } }],
											ContractLoad: [
												{ Actions: { $set: ["TotalTargetsCounter", "$.TotalTargetsCounter"] } }
											],
											ContractEnd: [{ Transition: "Success" }],
											exit_gate: [{ Transition: "Success" }]
										}
									}
								}
							},
							{
								Id: "85745a86-a55a-4286-bff8-44a7960f87c8",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: { IfInProgress: { Visible: false } },
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { "47_Infected": { Transition: "Success" } } }
								}
							},
							{
								Id: "e98be877-94bb-40a8-959f-5353a7704825",
								ObjectiveType: "custom",
								IgnoreIfInactive: true,
								OnActive: { IfCompleted: { Visible: false } },
								Activation: { $eq: ["$85745a86-a55a-4286-bff8-44a7960f87c8", "Completed"] },
								Image: "images/contracts/whitespider/004_flu/WS_Flu_Obj_Antidote.jpg",
								BriefingName: "$loc UI_CONTRACT_FLU_ANTIDOTE_TITLE",
								BriefingText: "$loc UI_CONTRACT_FLU_ANTIDOTE_DESC",
								Category: "primary",
								HUDTemplate: { display: "$loc UI_CONTRACT_FLU_ANTIDOTE_OBJ" },
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["d940d53e-738c-4033-8bfd-c2ee28ae4e8a"] },
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { "47_Infected": { Transition: "Get_Antidote" } },
										Get_Antidote: {
											"47_Cured": { Transition: "Success" },
											$timer: { Condition: { $after: 300 }, Transition: "Failure" }
										}
									}
								}
							}
						]
					case "LOCATION_NEWZEALAND":
						return [
							{
								_comment: "----- Enter House -----",
								Id: "2022ec96-b328-4aa7-a309-507fd263b235",
								Category: "primary",
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/Sheep_Enter_House.jpg",
								BriefingName: "$loc UI_CONTRACT_SHEEP_ENTER_NAME",
								BriefingText: "$loc UI_CONTRACT_SHEEP_ENTER_DESC",
								LongBriefingText: "$loc UI_CONTRACT_SHEEP_ENTER_LONGDESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_SHEEP_ENTER_NAME", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { HouseEnteredEvent: { Transition: "Success" } } } }
							},
							{
								_comment: "----- Gather intel -----",
								Id: "55b42190-ab18-404e-8686-b60358dea1d4",
								Category: "primary",
								Primary: true,
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								UpdateActivationWhileCompleted: true,
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/Sheep_Gather_Intel.jpg",
								BriefingName: "$loc UI_CONTRACT_SHEEP_INTEL_NAME",
								BriefingText: "$loc UI_CONTRACT_SHEEP_INTEL_DESC",
								LongBriefingText: "$loc UI_CONTRACT_SHEEP_INTEL_LONGDESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_SHEEP_INTEL_NAME", iconType: 17 },
								Activation: { $eq: ["$2022ec96-b328-4aa7-a309-507fd263b235", "Completed"] },
								Type: "statemachine",
								Definition: { States: { Start: { IntelGatheredEvent: { Transition: "Success" } } } },
								OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
								OnActive: { IfCompleted: { Visible: true } }
							}
						]
					case "LOCATION_MIAMI":
						return [
							{
								Id: "e4b445db-bf1a-4239-acdc-83d945d198a7",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { TargetEscapeStarted: { Transition: "Success" } } }
								}
							},
							{
								Id: "5b1534ef-7848-440c-855a-d2635663dd74",
								Category: "primary",
								ExcludeFromScoring: true,
								IgnoreIfInactive: true,
								Activation: { $eq: ["$e4b445db-bf1a-4239-acdc-83d945d198a7", "Completed"] },
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_FLAMINGO_ROBERT_ESCAPED",
								HUDTemplate: { display: "$loc UI_CONTRACT_FLAMINGO_ROBERT_ESCAPING" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { TargetEscapeStarted: { Transition: "TargetIsEscaping" } },
										TargetIsEscaping: {
											TargetEscaped: { Transition: "Failure" },
											Kill: {
												Condition: {
													$eq: ["$Value.RepositoryId", "ee454990-0c4b-49e5-9572-a67887325283"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_COLOMBIA_ANACONDA":
						return [
							{
								Id: "d61d68e2-1e72-4c50-9c65-f2106ae30a9d",
								Category: "primary",
								ObjectiveType: "custom",
								Image: "images/unlockables/item_perspective_e5bde241-5958-496d-9d2d-39932fe93123_0.jpg",
								ForceShowOnLoadingScreen: true,
								BriefingName: "$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_NAME",
								BriefingText: "$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_TEXT",
								LongBriefingText: "$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_LONG",
								HUDTemplate: { display: "$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_HUD", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["e5bde241-5958-496d-9d2d-39932fe93123"] },
									States: {
										Start: {
											ItemPickedUp: {
												Condition: {
													$eq: ["$Value.RepositoryId", "e5bde241-5958-496d-9d2d-39932fe93123"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_MUMBAI":
						return [
							{
								_comment: "----- Identify the Maelstrom -----",
								Id: "7effacb2-77d2-4a9c-86a7-6a69eb0aa1e2",
								Category: "primary",
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/mongoose_wazir_kale.jpg",
								BriefingName: "$loc UI_CONTRACT_MONGOOSE_OBJ_ID_TITLE",
								BriefingText: "$loc UI_CONTRACT_MONGOOSE_OBJ_ID_DESC",
								LongBriefingText: "$loc UI_CONTRACT_MONGOOSE_OBJ_ID_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_MONGOOSE_OBJ_ID_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { IdentifyMaelstrom: { Transition: "Success" } } } }
							},
							{
								_comment: "----- Eliminate the Maelstrom Identified -----",
								Id: "85c5ac7e-55ba-44fc-9225-82e6c1250b51",
								UpdateActivationWhileCompleted: true,
								IsHidden: false,
								Category: "primary",
								Activation: { $eq: ["$7effacb2-77d2-4a9c-86a7-6a69eb0aa1e2", "Completed"] },
								SuccessEvent: {
									EventName: "Kill",
									EventValues: { RepositoryId: "c7c9e213-16f9-4215-bf07-dd8f801ce3e0" }
								},
								OnActive: { IfCompleted: { Visible: true } },
								OnInactive: { IfCompleted: { State: "Completed" } }
							},
							{
								_comment: "----- Eliminate the Maelstrom Not identified -----",
								Id: "7161cbf5-af3a-4a1b-b2b8-60437c4e8187",
								UpdateActivationWhileCompleted: true,
								IsHidden: true,
								ExcludeFromScoring: true,
								Category: "primary",
								Activation: { $eq: ["$7effacb2-77d2-4a9c-86a7-6a69eb0aa1e2", "InProgress"] },
								SuccessEvent: {
									EventName: "Kill",
									EventValues: { RepositoryId: "c7c9e213-16f9-4215-bf07-dd8f801ce3e0" }
								},
								OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
								OnActive: { IfInProgress: { Visible: false }, IfCompleted: { Visible: false } }
							}
						]
					case "LOCATION_NORTHAMERICA":
						return [
							{
								_comment: "----- Find Clues Dynamic Counter -----",
								Id: "369dd2f7-acfa-4c51-b03d-dbbb4bb863ac",
								Category: "primary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/skunk_trackingtheconstant.jpg",
								BriefingName: "$loc UI_CONTRACT_SKUNK_OBJ_CLUES_TITLE",
								LongBriefingText: "$loc UI_CONTRACT_SKUNK_OBJ_CLUES_DESC",
								BriefingText: "$loc UI_CONTRACT_SKUNK_OBJ_CLUES_HEADER",
								HUDTemplate: { display: "$loc UI_CONTRACT_SKUNK_OBJ_CLUES_TITLE", iconType: 17 },
								Type: "statemachine",
								Scope: "hit",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_SKUNK_OBJ_CLUES_DYNAMIC_TITLE",
														data: ["$.IntelCounter", "$.total"]
													}
												},
												iconType: 17
											}
										}
									},
									Context: { IntelCounter: 0, update_counter: 1, total: 3 },
									States: {
										Start: {
											One_Clue_Found: { Actions: { $inc: "IntelCounter", $dec: "update_counter" } },
											Two_Clues_Found: { Actions: { $inc: "IntelCounter", $dec: "update_counter" } },
											Three_Clues_Found: { Actions: { $inc: "IntelCounter", $dec: "update_counter" } },
											AllCluesCollected: { Transition: "Success" }
										}
									}
								}
							},
							{
								Id: "8d1a5ed6-2e2d-427e-b88b-b31c1d2a9d87",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: true },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { BackgroundCheckStarted: { Transition: "Failure" } } }
								}
							},
							{
								Activation: { $eq: ["$8d1a5ed6-2e2d-427e-b88b-b31c1d2a9d87", "Failed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_SKUNK_TIMER_BACKGROUNDCHECK" },
								Id: "f92b9623-6cb5-44cb-b9a2-bf483a3bfe1d",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_HAWK_TIMER_TIMED_OUT", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { BeginTimer: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 300 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											},
											EndTimer: { Transition: "Failure" }
										}
									}
								}
							}
						]
					case "LOCATION_NORTHSEA":
						return [
							{
								_comment: "----- [HIDDEN] Do not Eliminate The Constant -----",
								Id: "a50652e6-eccb-4491-97ea-d03ca15b11a0",
								Primary: true,
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								ExcludeFromScoring: true,
								OnActive: { IfFailure: { Visible: true } },
								Image: "images/actors/Magpie_The_Constant.jpg",
								BriefingName: "$loc UI_CONTRACT_MAGPIE_CONSTANT_NAME",
								BriefingText: "$loc UI_CONTRACT_MAGPIE_CONSTANT_OBJ",
								HUDTemplate: { display: "$loc UI_CONTRACT_MAGPIE_CONSTANT_OBJ", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: { Start: { Constant_Down: { Transition: "Failure" } } }
								}
							},
							{
								Id: "0b6010b3-988f-4066-90ff-1f872128aff4",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { ActivateConstantObjective: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- [OPTIONAL] Help Grey Kidnap The Constant -----",
								Id: "9eb900f5-4d1e-4464-8ea9-1a9df6b869d0",
								Category: "secondary",
								UpdateActivationWhileCompleted: false,
								IgnoreIfInactive: true,
								ExcludeFromScoring: true,
								OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
								Activation: { $eq: ["$0b6010b3-988f-4066-90ff-1f872128aff4", "Completed"] },
								OnActive: { IfCompleted: { Visible: true } },
								ObjectiveType: "custom",
								Image: "images/actors/Magpie_The_Constant.jpg",
								BriefingName: "$loc UI_CONTRACT_MAGPIE_CONSTANT_NAME",
								BriefingText: "$loc UI_CONTRACT_MAGPIE_KIDNAP_CONSTANT_OBJ",
								HUDTemplate: { display: "$loc UI_CONTRACT_MAGPIE_KIDNAP_CONSTANT_OBJ", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: {
										Start: { ActivateConstantObjective: { Transition: "SecureConstant" } },
										SecureConstant: { ConstantSecured: { Transition: "Success" } }
									}
								}
							},
							{
								_comment: "----- The Constant Escaped -----",
								Id: "5ff67d0f-9fcc-4775-ad60-364e69571388",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_MAGPIE_CONSTANT_ESCAPED_OBJ",
								HUDTemplate: { display: "$loc UI_CONTRACT_MAGPIE_CONSTANT_ESCAPED_OBJ", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: {},
									display: { iconType: 17 },
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { ConstantOnChopper: { Transition: "EscapeCountdownStart" } },
										EscapeCountdownStart: {
											BothTwinsDead: { Transition: "Success" },
											$timer: { Condition: { $after: 300 }, Transition: "Failure" }
										}
									}
								}
							}
						]
					case "LOCATION_GREEDY_RACCOON":
						return [
							{
								_comment: "----- Get McGuffin -----",
								Id: "b6dae5cd-31f7-4c81-8ccb-b0b9c58c791d",
								UpdateActivationWhileCompleted: true,
								Category: "primary",
								Primary: true,
								ObjectiveType: "custom",
								ExcludeFromScoring: true,
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/raccoon-gather-intel.jpg",
								BriefingName: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_TITLE",
								BriefingText: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_TITLE", iconType: 17 },
								Type: "statemachine",
								Scope: "session",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DYNAMIC",
														data: ["$.Core", "$.Disks"]
													}
												},
												iconType: 17
											}
										}
									},
									Context: {
										Core: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_CORE_GET",
										Disks: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_0",
										Core_Get: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_CORE_GET",
										Core_Got: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_CORE_GOT",
										Disk_0: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_0",
										Disk_1: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_1",
										Disk_2: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_2",
										PieceCounter: 0,
										update_counter: 0
									},
									States: {
										Start: {
											"-": { Actions: { $inc: "update_counter" } },
											DiskPieceFound: { Actions: { $inc: "PieceCounter" }, Transition: "DiskText" },
											McGuffinGotEvent: {
												Actions: { $set: ["Core", "$.Core_Got"] },
												Transition: "Success"
											}
										},
										DiskText: {
											"-": [
												{
													Condition: { $eq: ["$.PieceCounter", 0] },
													Actions: { $set: ["Disks", "$.Disk_0"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 1] },
													Actions: { $set: ["Disks", "$.Disk_1"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 2] },
													Actions: { $set: ["Disks", "$.Disk_2"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 3] },
													Actions: { $set: ["Core", ""] },
													Transition: "Success"
												},
												{ Actions: { $set: ["Core", "$.Core_Get"] }, Transition: "Start" }
											]
										},
										Success: {
											"-": { Actions: { $set: ["Disks", ""], $inc: "update_counter" } },
											McGuffinLostEvent: { Transition: "DiskText" },
											DiskPieceFound: [
												{ Actions: { $inc: "PieceCounter" } },
												{ Condition: { $eq: ["$.PieceCounter", 3] }, Transition: "DiskText" }
											]
										}
									}
								}
							},
							{
								_comment: "----- Scoring Dummy for DataCore Objective -----",
								Id: "dc87ba2d-2e2d-4a9d-9fd9-ce005345425a",
								Category: "primary",
								Primary: true,
								ObjectiveType: "custom",
								Image: "",
								BriefingName: "",
								BriefingText: "",
								Type: "statemachine",
								Scope: "session",
								Definition: { States: { Start: { exit_gate: { Transition: "Success" } } } }
							}
						]
					case "LOCATION_GOLDEN_GECKO":
						return [
							{
								_comment: "----- Marcus Stuyvesant Escape -----",
								Id: "9571d196-8d67-4d94-8dad-6e2d970d7a91",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_GECKO_FAIL_ESCAPE_MARCUS",
								HUDTemplate: { display: "$loc UI_CONTRACT_GECKO_OBJ_ESCAPE_MARCUS" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { MarcusEscapeStarted: { Transition: "Countdown" } },
										Countdown: {
											MarcusEscapeFoiled: { Transition: "Success" },
											$timer: { Condition: { $after: 20 }, Transition: "Failure" },
											Kill: {
												Condition: {
													$eq: ["$Value.RepositoryId", "88f7ec38-c083-4de0-9004-c1e4f0e4fba0"]
												},
												Transition: "Success"
											}
										}
									}
								}
							},
							{
								_comment: "----- Carl Ingram Escape -----",
								Id: "e9722da6-65e2-49b1-b951-a82efc54ea35",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_GECKO_FAIL_ESCAPE_INGRAM",
								HUDTemplate: { display: "$loc UI_CONTRACT_GECKO_OBJ_ESCAPE_INGRAM" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { IngramEscapeStarted: { Transition: "Countdown" } },
										Countdown: {
											IngramEscapeFoiled: { Transition: "Success" },
											$timer: { Condition: { $after: 20 }, Transition: "Failure" },
											Kill: {
												Condition: {
													$eq: ["$Value.RepositoryId", "bd0689d6-07b4-4757-b8ee-cac19f1c9e16"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_ANCESTRAL_BULLDOG":
						return [
							{
								_comment: "----- Find the Case File -----",
								Id: "ccb699ba-e975-40bd-aa7b-9b3c88cd6448",
								Category: "primary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/Ancestral_gather_intel.jpg",
								BriefingName: "$loc UI_CONTRACT_BULLDOG_OBJ_FILE_NAME",
								BriefingText: "$loc UI_CONTRACT_BULLDOG_OBJ_FILE_TEXT",
								LongBriefingText: "$loc UI_CONTRACT_BULLDOG_OBJ_FILE_LONG",
								HUDTemplate: { display: "$loc UI_CONTRACT_BULLDOG_OBJ_FILE_TEXT", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: {
										CaseFile: ["e5bde241-5958-496d-9d2d-39932fe93123"],
										Casepart: [
											"a7afa677-83d0-4aba-82f4-78654de07ed2",
											"79fc044c-e3cc-4f92-8402-394a1699d4c3"
										]
									},
									States: {
										Start: {
											CaseFileAcquired: { Transition: "Success" },
											BothCasePartsAcquired: { Transition: "Success" }
										}
									}
								}
							}
						]
					case "LOCATION_EDGY_FOX":
						return [
							{
								_comment: "----- Silent objective to trigger Olivia Objective -----",
								Id: "52c2496a-34e9-48da-98ce-4cf12b8e53c5",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { StartOliviaObjective: { Transition: "Success" } } }
								}
							},
							{
								_comment:
									"----- Hidden objective to check for lesser targets killed before being active -----",
								Id: "8814dcc8-cc82-47e3-9536-19211d65ec07",
								IgnoreIfInactive: true,
								UpdateActivationWhileCompleted: true,
								IsHidden: true,
								ExcludeFromScoring: true,
								Category: "primary",
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								OnActive: { IfInProgress: { Visible: false }, IfCompleted: { Visible: false } },
								Activation: { $eq: ["$52c2496a-34e9-48da-98ce-4cf12b8e53c5", "Completed"] },
								Type: "statemachine",
								Scope: "hit",
								Definition: {
									ContextListeners: {
										RemainingTargetsCount: {
											type: "objective-counter",
											header: "UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_COUNT_HEAD"
										}
									},
									Context: {
										Targets: [
											"252428ca-3f8e-4477-b2b9-58f18cff3e44",
											"abd1c0e7-e406-43bd-9185-419029c5bf3d",
											"922deccd-7fb4-45d9-ae3d-2cf11915c403",
											"b8e7e65b-587e-471b-894d-282cda6614d4",
											"2ab07903-e958-4af6-b01c-b62058745ce1",
											"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
											"633398ac-c4b4-4441-852d-ae6460172025",
											"eb024a5e-9580-49dc-a519-bb92c886f3b1",
											"1305c2e4-6394-4cfa-b873-22adbd0c9702",
											"f83376a4-6e56-4f2a-8122-151b272108fd",
											"8b29da09-461f-44d7-9042-d4fde829b9f2"
										],
										RemainingTargetsCount: 11
									},
									States: {
										Start: {
											Kill: [
												{
													Actions: { $dec: "RemainingTargetsCount" },
													Condition: {
														$inarray: {
															in: "$.Targets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												},
												{ Condition: { $eq: ["$.RemainingTargetsCount", 0] }, Transition: "Success" }
											],
											FoxTargetIdentification: [
												{ Actions: { $remove: ["Targets", "$Value.RepositoryId"] } },
												{ Condition: { $eq: ["$.RemainingTargetsCount", 0] }, Transition: "Success" }
											]
										}
									}
								}
							},
							{
								_comment: "------ First objective from default starting location: Contact Olivia Obj -----",
								Id: "be29b79d-68b5-49df-a07d-d8fe58b766e5",
								Category: "secondary",
								IgnoreIfInactive: true,
								Activation: { $eq: ["$52c2496a-34e9-48da-98ce-4cf12b8e53c5", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/fox/Fox_Contact_Olivia.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { ObjectiveOliviaFinishPt1: { Transition: "Success" } } } }
							},
							{
								_comment: "----- Second objective from default starting location: Find Olivia Obj -----",
								Id: "4402ad59-e4b2-4de5-ad58-d1fa8b163810",
								IgnoreIfInactive: true,
								Category: "secondary",
								Activation: { $eq: ["$be29b79d-68b5-49df-a07d-d8fe58b766e5", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								Image: "images/contracts/fox/Fox_Locate_Olivia.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { ObjectiveOliviaFinishPt2: { Transition: "Success" } } } }
							},
							{
								_comment: "----- Silent objective to trigger Pickup earpiece objective -----",
								IgnoreIfInactive: true,
								Id: "dce61868-a885-42fd-9274-d48ddb0d30aa",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { EarpieceObjectiveStart: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- Optional Objective from default starting location: Pick up earpiece -----",
								IgnoreIfInactive: true,
								Id: "2a52744b-e290-43ce-9e18-115180d3d460",
								Category: "secondary",
								Activation: { $eq: ["$dce61868-a885-42fd-9274-d48ddb0d30aa", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								Image: "images/contracts/fox/Fox_Pickup_Earpiece.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_OBJ_EARPIECE_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_OBJ_EARPIECE_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_OBJ_EARPIECE_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_OBJ_EARPIECE_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { EarpieceObjectiveComplete: { Transition: "Success" } } } }
							},
							{
								_comment: "----- DEFAULT SL: Silent Objective to trigger main objective -----",
								Id: "642e7f65-72ef-4a77-abd4-ea2d4454cd31",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { StartMainObjectives: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- OTHER SL: Silent Objective to trigger main objective -----",
								Id: "ec243189-3a89-4d6b-b1f7-958d95658e2b",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { StartMainObjective_OtherSL: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- OTHER SL:  Eliminate Agents -----",
								Id: "11d9655f-190c-4181-be5f-30cadd50dc3c",
								IgnoreIfInactive: true,
								Category: "primary",
								Activation: { $eq: ["$ec243189-3a89-4d6b-b1f7-958d95658e2b", "Completed"] },
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/fox/Fox_Eliminate_Lesser_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_TITLE" },
								Type: "statemachine",
								Scope: "session",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HUD",
														data: ["$.AgentsKilledCounter", "$.AgentsKilledGoal"]
													}
												}
											}
										}
									},
									Context: {
										Targets: [
											"252428ca-3f8e-4477-b2b9-58f18cff3e44",
											"abd1c0e7-e406-43bd-9185-419029c5bf3d",
											"922deccd-7fb4-45d9-ae3d-2cf11915c403",
											"b8e7e65b-587e-471b-894d-282cda6614d4",
											"2ab07903-e958-4af6-b01c-b62058745ce1",
											"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
											"633398ac-c4b4-4441-852d-ae6460172025",
											"eb024a5e-9580-49dc-a519-bb92c886f3b1",
											"1305c2e4-6394-4cfa-b873-22adbd0c9702",
											"f83376a4-6e56-4f2a-8122-151b272108fd",
											"8b29da09-461f-44d7-9042-d4fde829b9f2"
										],
										AgentsKilledCounter: 0,
										AgentsKilledGoal: 5,
										update_counter: 1
									},
									States: {
										Start: { StartMainObjective_OtherSL: { Transition: "CheckKills" } },
										CheckKills: {
											Kill: [
												{
													Actions: { $inc: "AgentsKilledCounter", $dec: "update_counter" },
													Condition: {
														$inarray: {
															in: "$.Targets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												},
												{ Condition: { $eq: ["$.AgentsKilledCounter", 5] }, Transition: "Success" }
											]
										}
									}
								}
							},
							{
								_comment: "----- DEFAULT SL: Eliminate Agents -----",
								Id: "47de2b7d-eae7-4d60-9987-154078ff11e9",
								IgnoreIfInactive: true,
								Category: "primary",
								Activation: { $eq: ["$642e7f65-72ef-4a77-abd4-ea2d4454cd31", "Completed"] },
								OnActive: { IfCompleted: { Visible: true } },
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/fox/Fox_Eliminate_Lesser_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_SH_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_SH_TITLE" },
								Type: "statemachine",
								Scope: "session",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HUD",
														data: ["$.AgentsKilledCounter", "$.Questionmark"]
													}
												}
											}
										}
									},
									Context: {
										Targets: [],
										Questionmark: "?",
										AgentsKilledCounter: 0,
										AgentsKilledGoal: 5,
										update_counter: 1
									},
									States: {
										Start: { StartMainObjectives: { Transition: "CheckKills" } },
										CheckKills: {
											FoxTargetIdentification: {
												Actions: { $pushunique: ["Targets", "$Value.RepositoryId"] }
											},
											Kill: [
												{
													Actions: { $inc: "AgentsKilledCounter", $dec: "update_counter" },
													Condition: { $eq: ["$Value.IsTarget", true] }
												},
												{ Condition: { $eq: ["$.AgentsKilledCounter", 5] }, Transition: "Success" }
											]
										},
										Success: {
											"-": { Actions: { $set: ["Questionmark", "5"], $dec: "update_counter" } }
										}
									}
								}
							},
							{
								_comment: "------ Explore the Compound and find ICA Agents -----",
								Id: "88921515-8ae2-4369-b089-623e60490f74",
								Category: "secondary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								Activation: { $eq: ["$2a52744b-e290-43ce-9e18-115180d3d460", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: { IfInProgress: { Visible: true }, IfCompleted: { Visible: false } },
								OnInactive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Image: "images/contracts/fox/Fox_Search_The_Compound.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: { Targets: [], KilledTargets: 0, Active: true },
									States: {
										Start: {
											FoxTargetIdentification: [
												{ Actions: { $pushunique: ["Targets", "$Value.RepositoryId"] } },
												{
													Condition: { $gt: ["($.Targets).Count", "$.KilledTargets"] },
													Transition: "Success"
												}
											],
											Kill: [
												{
													Condition: { $eq: ["$Value.IsTarget", true] },
													Actions: { $inc: "KilledTargets" }
												},
												{ Condition: { $eq: ["$.KilledTargets", 5] }, Transition: "Success" }
											]
										},
										Success: {
											Kill: [
												{
													Condition: { $eq: ["$Value.IsTarget", true] },
													Actions: { $inc: "KilledTargets" }
												},
												{
													Condition: { $eq: ["$.KilledTargets", 5] },
													Actions: { $set: ["Active", false] }
												},
												{
													Condition: {
														$and: [
															{ $le: ["($.Targets).Count", "$.KilledTargets"] },
															{ $eq: ["$.Active", true] }
														]
													},
													Transition: "Start"
												}
											],
											FoxTargetIdentification: {
												Actions: { $pushunique: ["Targets", "$Value.RepositoryId"] }
											}
										}
									}
								}
							},
							{
								_comment:
									"----- Invisible Seconday: Eliminate Lesser Agents. Allow us to kill stragglers -----",
								Id: "7e74ccd4-5070-4bfd-b9b0-b7fe5ecb8ab9",
								Category: "secondary",
								IsHidden: true,
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Activation: {
									$or: [
										{ $eq: ["$47de2b7d-eae7-4d60-9987-154078ff11e9", "Completed"] },
										{ $eq: ["$11d9655f-190c-4181-be5f-30cadd50dc3c", "Completed"] }
									]
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/whitespider/003_rabies/Rabies_Eliminate_Infected_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_OBJ" },
								Type: "statemachine",
								Scope: "hit",
								Definition: {
									Context: {
										Targets: [
											"252428ca-3f8e-4477-b2b9-58f18cff3e44",
											"abd1c0e7-e406-43bd-9185-419029c5bf3d",
											"922deccd-7fb4-45d9-ae3d-2cf11915c403",
											"b8e7e65b-587e-471b-894d-282cda6614d4",
											"2ab07903-e958-4af6-b01c-b62058745ce1",
											"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
											"633398ac-c4b4-4441-852d-ae6460172025",
											"eb024a5e-9580-49dc-a519-bb92c886f3b1",
											"1305c2e4-6394-4cfa-b873-22adbd0c9702",
											"8b29da09-461f-44d7-9042-d4fde829b9f2",
											"f83376a4-6e56-4f2a-8122-151b272108fd"
										],
										RemainingTargetsCount: 10
									},
									States: {
										Start: {
											Kill: [
												{
													Actions: { $dec: "RemainingTargetsCount" },
													Condition: {
														$inarray: {
															in: "$.Targets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												},
												{ Condition: { $eq: ["$.RemainingTargetsCount", 0] }, Transition: "Success" }
											]
										}
									}
								}
							}
						]
					case "LOCATION_WET_RAT":
						return [
							{
								_comment: "----- START VETTING HACK COUNTDOWN -----",
								Id: "5dc023cb-083f-49e5-8c42-1f0f47f56700",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { StartVettingTimer: { Transition: "Failure" } } }
								}
							},
							{
								Activation: { $eq: ["$5dc023cb-083f-49e5-8c42-1f0f47f56700", "Failed"] },
								_comment: "----- VETTING HACK PUZZLE -----",
								Id: "620db22d-ff0f-46d2-9c99-3fcca69c6586",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false }, IfFailed: { Visible: false } },
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_VETTING" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { StartVettingTimer: { Transition: "VettingTimer" } },
										VettingTimer: {
											VettingSuccessful: { Transition: "Success" },
											$timer: { Condition: { $after: 57 }, Transition: "Failure" }
										}
									}
								}
							},
							{
								_comment: "Activates Data Core OPTIONAL Objectives",
								Id: "52e024e8-26b8-4cb2-8f17-93e649a33c95",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: { IfFailed: { Visible: false }, IfInProgress: { Visible: false } },
								Definition: {
									Constants: { Goal: 2 },
									Context: { Count: 0 },
									States: {
										Start: {
											DefaultStartingLocation: { Transition: "Failure" },
											Kill: [
												{
													Condition: { $eq: ["$Value.IsTarget", true] },
													Actions: { $inc: "Count" }
												},
												{ Condition: { $eq: ["$.Count", "$.Goal"] }, Transition: "Success" }
											]
										}
									}
								}
							},
							{
								_comment: "Get Data [OPTIONAL]",
								Id: "851cfa2a-874d-4374-8f3e-74379ce429e6",
								Category: "secondary",
								Type: "statemachine",
								Activation: { $eq: ["$52e024e8-26b8-4cb2-8f17-93e649a33c95", "Completed"] },
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								ExcludeFromScoring: true,
								ObjectiveType: "setpiece",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_OPTIONAL",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_OPTIONAL", iconType: 17 },
								Definition: {
									Context: { Targets: ["f9c04811-11e8-464d-9222-d79a636cebf3"] },
									States: { Start: { DataGot: { Transition: "Success" } } }
								}
							},
							{
								_comment: "Get Data - Primary - Invisible ",
								Id: "6a631726-5bd4-4e06-84a0-56c805c4ab92",
								Category: "primary",
								ExcludeFromScoring: true,
								IsHidden: true,
								IgnoreIfInactive: true,
								Activation: { $eq: ["$8283ba19-13db-4f34-a27d-228a275a4f48", "Completed"] },
								OnActive: { IfInProgress: { Visible: false }, IfCompleted: { Visible: false } },
								OnInactive: { IfInProgress: { Visible: false }, IfCompleted: { Visible: false } },
								ObjectiveType: "custom",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_03", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: { OneTime: true },
									States: {
										Start: { "-": { Transition: "Success" } },
										Active: {
											DataGot: { Actions: { $set: ["OneTime", false] }, Transition: "Success" }
										},
										Success: {
											DefaultStartingLocation: {
												Condition: { $eq: ["$.OneTime", true] },
												Transition: "Active"
											}
										}
									}
								}
							},
							{
								_comment: "Activates Data Core Objectives",
								Id: "8283ba19-13db-4f34-a27d-228a275a4f48",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { DefaultStartingLocation: { Transition: "Success" } } }
								}
							},
							{
								_comment: "Get Data - No Targets Killed",
								Id: "c75bb683-781d-41aa-be06-264083a8d658",
								Category: "secondary",
								Type: "statemachine",
								Activation: { $eq: ["$8283ba19-13db-4f34-a27d-228a275a4f48", "Completed"] },
								OnActive: { IfCompleted: { Visible: false } },
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_UNAVAILABLE",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_01", iconType: 17 },
								Definition: {
									States: {
										Start: {
											Kill: { Condition: { $eq: ["$Value.IsTarget", true] }, Transition: "Success" }
										}
									}
								}
							},
							{
								_comment: "Get Data - 1 Targets Killed",
								Id: "6debc7f2-d4f8-4be5-88ce-e09af4821a78",
								Category: "secondary",
								Type: "statemachine",
								Activation: {
									$eq: [
										"$c75bb683-781d-41aa-be06-264083a8d658",
										"$8283ba19-13db-4f34-a27d-228a275a4f48",
										"Completed"
									]
								},
								OnActive: { IfCompleted: { Visible: false } },
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_UNAVAILABLE",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_02", iconType: 17 },
								Definition: {
									Constants: { Goal: 2 },
									Context: { Count: 0 },
									States: {
										Start: {
											Kill: [
												{
													Condition: { $eq: ["$Value.IsTarget", true] },
													Actions: { $inc: "Count" }
												},
												{ Condition: { $eq: ["$.Count", "$.Goal"] }, Transition: "Success" }
											]
										}
									}
								}
							},
							{
								_comment: "Get Data - All Targets Killed",
								Id: "63c0b383-a72f-4591-95ce-453a0152863e",
								Category: "secondary",
								Type: "statemachine",
								Activation: {
									$eq: [
										"$8283ba19-13db-4f34-a27d-228a275a4f48",
										"$6debc7f2-d4f8-4be5-88ce-e09af4821a78",
										"Completed"
									]
								},
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								ExcludeFromScoring: true,
								ObjectiveType: "setpiece",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_03",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_03", iconType: 17 },
								Definition: {
									Context: { Targets: ["f9c04811-11e8-464d-9222-d79a636cebf3"] },
									States: { Start: { DataGot: { Transition: "Success" } } }
								}
							},
							{
								Id: "f4afd898-9270-4e3a-9a26-326172760a01",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { ShowDataObjectiveSecond: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- Get Data Second Playthrough -----",
								Id: "8281663a-3787-42ab-ada1-6048757529a4",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
								Activation: { $eq: ["$f4afd898-9270-4e3a-9a26-326172760a01", "Completed"] },
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_OPTIONAL_TITLE",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_OPTIONAL_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { CompleteDataObjectiveSecond: { Transition: "Success" } } } }
							}
						]
					case "LOCATION_ELEGANT_LLAMA":
						return [
							{
								_comment: "----- Find Diana Burnwood -----",
								Id: "fdd987fd-20e2-42f8-a28a-6420584be50c",
								Primary: true,
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								Image: "images/actors/Llama_Diana_Burnwood.jpg",
								BriefingName: "$loc UI_CONTRACT_LLAMA_DIANA_FIND_NAME",
								BriefingText: "$loc UI_CONTRACT_LLAMA_DIANA_FIND_OBJ",
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_DIANA_FIND_NAME", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: {
										Start: {
											Diana_Fail: { Transition: "Failure" },
											Diana_Find_Completed: { Transition: "Success" }
										}
									}
								},
								Category: "primary"
							},
							{
								_comment: "----- Do Not Eliminate Diana Burnwood -----",
								Id: "ffaa1229-2fd3-4a93-87ca-974122e2a25f",
								Primary: true,
								Activation: { $eq: ["$fdd987fd-20e2-42f8-a28a-6420584be50c", "Completed"] },
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								Image: "images/actors/Llama_Diana_Burnwood.jpg",
								BriefingName: "$loc UI_CONTRACT_LLAMA_DIANA_NAME",
								BriefingText: "$loc UI_CONTRACT_LLAMA_DIANA_NAME",
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_DIANA_NAME", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: { Start: { Diana_Extract_Start: { Transition: "Success" } } }
								},
								Category: "primary"
							},
							{
								_comment: "----- Do Not Eliminate Diana Burnwood Dummy -----",
								Id: "636aef3d-3c15-4a5f-882a-d04a19ebbc7c",
								Primary: true,
								Activation: { $eq: ["$fdd987fd-20e2-42f8-a28a-6420584be50c", "Completed"] },
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Image: "images/actors/Llama_Diana_Burnwood.jpg",
								BriefingName: "$loc UI_CONTRACT_LLAMA_DIANA_NAME",
								BriefingText: "$loc UI_CONTRACT_LLAMA_DIANA_NAME",
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_DIANA_NAME", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: { Start: { Diana_Fail: { Transition: "Failure" } } }
								},
								Category: "primary"
							},
							{
								Id: "76c66acd-18d7-4f93-b74f-95a6bea515d8",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: true },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { DianaMurderStarted: { Transition: "Failure" } } }
								}
							},
							{
								Activation: { $eq: ["$76c66acd-18d7-4f93-b74f-95a6bea515d8", "Failed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_TIMER_DIANAMURDER" },
								Id: "f92b9623-6cb5-44cb-b9a2-bf483a3bfe1d",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_HAWK_TIMER_TIMED_OUT", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { BeginTimer: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 600 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											},
											EndTimer: { Transition: "Failure" },
											SuccessTimer: { Transition: "Success" }
										}
									}
								}
							},
							{
								_comment: "----- Dormant Laser Timer 1 -----",
								Id: "1420233f-fb30-4d9d-b8b3-bf97231e526b",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { LASER_TIMER_ACTIVATE: { Transition: "Success" } } }
								}
							},
							{
								Activation: { $eq: ["$1420233f-fb30-4d9d-b8b3-bf97231e526b", "Completed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_LASERTIMER_TITLE" },
								_comment: "----- LASER TIMER 1 -----",
								Id: "01d97de2-bb2a-42b7-93c1-ea29c60bfd9b",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_LLAMA_LASERTIMER1", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { LASER_TIMER_ON: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 60 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											}
										}
									}
								}
							},
							{
								_comment: "----- Dormant Laser Timer 2 -----",
								Id: "701a1d42-b317-4103-bd74-a01f19920eab",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { LASER_TIMER2_ACTIVATE: { Transition: "Success" } } }
								}
							},
							{
								Activation: { $eq: ["$701a1d42-b317-4103-bd74-a01f19920eab", "Completed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_LASERTIMER_TITLE" },
								_comment: "----- LASER TIMER 1 -----",
								Id: "d3098d33-247a-4849-8ce2-fb6b9a2850ed",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_LLAMA_LASERTIMER2", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { LASER_TIMER2_ON: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 60 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											}
										}
									}
								}
							},
							{
								_comment: "----- Dormant Laser Timer 3 -----",
								Id: "0662c9ff-dee3-44cf-ab2b-761eb970936a",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { LASER_TIMER3_ACTIVATE: { Transition: "Success" } } }
								}
							},
							{
								Activation: { $eq: ["$0662c9ff-dee3-44cf-ab2b-761eb970936a", "Completed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_LASERTIMER_TITLE" },
								_comment: "----- LASER TIMER 3 -----",
								Id: "c3e9ad3e-b913-4d7d-85ad-ad538141778c",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_LLAMA_LASERTIMER3", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { LASER_TIMER3_ON: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 60 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											}
										}
									}
								}
							}
						]
					case "LOCATION_TRAPPED_WOLVERINE":
						return [
							{
								_comment: "-----UI text objective for Eliminate any Providence NPC -----",
								Id: "efb1da8a-c282-4b6f-bc1a-7efea39e1421",
								Category: "secondary",
								Activation: { $eq: ["$c458f79e-f308-49d9-8491-854e04aaeecb", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								ObjectiveType: "custom",
								Type: "statemachine",
								Scope: "session",
								Image: "images/contracts/wolverine/wolverine_providence_logo_obj.jpg",
								BriefingName: "$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_TITLE",
								BriefingText: "$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_DESC",
								HUDTemplate: {
									display: "$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_TITLE",
									iconType: 17
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { RemoveOptionalObjective: [{ Transition: "Success" }] } }
								}
							},
							{
								_comment: "----- Objective hider -----",
								Id: "c458f79e-f308-49d9-8491-854e04aaeecb",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { EnableObjective: { Transition: "Success" } } }
								}
							}
						]
					case "LOCATION_ROCKY_DUGONG":
						return [
							{
								_comment: "----- Get McGuffin OR destroy satellite link -----",
								Id: "3a71e4b6-6de1-4cc7-8e21-02970fdb1b3a",
								UpdateActivationWhileCompleted: true,
								Category: "primary",
								Primary: true,
								ObjectiveType: "custom",
								ExcludeFromScoring: true,
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/Rocky_Destroy_McGuffin.jpg",
								BriefingName: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_TITLE",
								BriefingText: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_DESC",
								LongBriefingText: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_TITLE", iconType: 17 },
								Type: "statemachine",
								Scope: "session",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_DYNAMIC",
														data: ["$.Core", "$.Disks"]
													}
												},
												iconType: 17
											}
										}
									},
									Context: {
										Core: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_CONTROLS_DESTROY",
										Disks: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_KEY_0",
										Core_Get: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_CONTROLS_DESTROY",
										Core_Got: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_CONTROLS_DESTROYED",
										Disk_0: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_KEY_0",
										Disk_1: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_KEY_1",
										PieceCounter: 0,
										update_counter: 0
									},
									States: {
										Start: {
											"-": { Actions: { $inc: "update_counter" } },
											KeyPieceFound: { Actions: { $inc: "PieceCounter" }, Transition: "DiskText" },
											McGuffinDestroyedEvent: {
												Actions: { $set: ["Core", "$.Core_Got"] },
												Transition: "Success"
											}
										},
										DiskText: {
											"-": [
												{
													Condition: { $eq: ["$.PieceCounter", 0] },
													Actions: { $set: ["Disks", "$.Disk_0"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 1] },
													Actions: { $set: ["Disks", "$.Disk_1"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 2] },
													Actions: { $set: ["Core", ""] },
													Transition: "Success"
												},
												{ Actions: { $set: ["Core", "$.Core_Get"] }, Transition: "Start" }
											]
										},
										Success: {
											"-": { Actions: { $set: ["Disks", ""], $inc: "update_counter" } },
											KeyPieceFound: [
												{ Actions: { $inc: "PieceCounter" } },
												{ Condition: { $eq: ["$.PieceCounter", 2] }, Transition: "DiskText" }
											]
										}
									}
								}
							},
							{
								_comment: "----- Scoring Dummy for DataCore Objective -----",
								Id: "e4b13eee-c90d-40ef-9ced-720d0b209721",
								Category: "primary",
								Primary: true,
								ObjectiveType: "custom",
								Image: "",
								BriefingName: "",
								BriefingText: "",
								Type: "statemachine",
								Scope: "session",
								Definition: { States: { Start: { exit_gate: { Transition: "Success" } } } }
							}
						]
				}
			}

			if (selectedMission == "LOCATION_ELEGANT_LLAMA") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$ffaa1229-2fd3-4a93-87ca-974122e2a25f", "Completed")
				}
			} else if (selectedMission == "LOCATION_GREEDY_RACCOON") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$b6dae5cd-31f7-4c81-8ccb-b0b9c58c791d", "Completed")
				}
			} else if (selectedMission == "LOCATION_COASTALTOWN") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$e15b5171-2b12-4966-9339-3344042f9867", "Completed")
				}
			} else if (selectedMission == "LOCATION_COASTALTOWN_EBOLA") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$f6d7ccfd-6f0b-4e01-b80f-982c051c4c8e", "Completed")
				}
			} else if (selectedMission == "LOCATION_MARRAKECH_NIGHT") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$341c93cc-05b5-45df-8b32-17ffa44e29ac", "Completed")
				}
			} else if (selectedMission == "LOCATION_HOKKAIDO_FLU") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$b8ffc636-4f9a-49b5-8293-98839a6ca202", "Completed")
				}
			} else if (selectedMission == "LOCATION_COLOMBIA_ANACONDA") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$d61d68e2-1e72-4c50-9c65-f2106ae30a9d", "Completed")
				}
			} else if (selectedMission == "LOCATION_NORTHAMERICA") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$369dd2f7-acfa-4c51-b03d-dbbb4bb863ac", "Completed")
				}
			} else if (selectedMission == "LOCATION_ANCESTRAL_BULLDOG") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$ccb699ba-e975-40bd-aa7b-9b3c88cd6448", "Completed")
				}
			} else if (selectedMission == "LOCATION_ROCKY_DUGONG") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$3a71e4b6-6de1-4cc7-8e21-02970fdb1b3a", "Completed")
				}
			} else if (selectedMission == "LOCATION_EDGY_FOX") {
				baseContract.Data["EnableExits"] = {
					$or: [
						{
							$eq: ["$47de2b7d-eae7-4d60-9987-154078ff11e9", "Completed"]
						},
						{
							$eq: ["$11d9655f-190c-4181-be5f-30cadd50dc3c", "Completed"]
						}
					]
				}
			} else {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("Completed")
				}
			}

			// Easter egg: why in the hell are you reading through this mess of a plugin? Are you a masochist or something?

			baseContract.Data.Objectives.push.apply(baseContract.Data.Objectives, additionalObjectives(selectedMission))

			if (selectedMission == "LOCATION_ICA_FACILITY_SHIP") {
				baseContract.Data.MandatoryLoadout = [
					{
						Id: "FIREARMS_HERO_PISTOL_TACTICAL_ICA_19",
						Properties: { LoadoutSlot: "concealedweapon", RepositoryId: "73875794-5a86-410e-84a4-1b5b2f7e5a54" }
					},
					{
						Id: "Melee_FiberWire_Descriptor",
						Properties: { LoadoutSlot: "gear", RepositoryId: "1a11a060-358c-4054-98ec-d3491af1d7c6" }
					}
				]
			} else if (selectedMission == "LOCATION_ICA_FACILITY") {
				baseContract.Data.MandatoryLoadout = [
					{
						Id: "FIREARMS_HERO_PISTOL_TACTICAL_ICA_19",
						Properties: { LoadoutSlot: "concealedweapon", RepositoryId: "73875794-5a86-410e-84a4-1b5b2f7e5a54" }
					},
					{
						Id: "Melee_FiberWire_Descriptor",
						Properties: { LoadoutSlot: "gear", RepositoryId: "1a11a060-358c-4054-98ec-d3491af1d7c6" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					}
				]
			}

			controller.addMission(baseContract)

			ids.push(contractId)

			require("node:fs").writeFileSync("out.json", JSON.stringify(baseContract))
		}
	})
}
