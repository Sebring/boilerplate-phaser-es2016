import GAME from '../constants/game'

export class Replay {

	constructor(actions) {
		//console.log(actions)
		
		//this.actions = actions
		this.store = actions
		this.noInput = GAME.NO_INPUT
		this.reset()
	}

	reset(actions = this.store) {
		this.actions = actions
		this.timeSlip = false
		this.prevAction = undefined
	}

	setActions(actions) {
		//console.log(actions)
	}

	getPosition(time, state) {
		let action = this.actions[0]

		if (action === undefined) {
			//console.log('no more actions ', this.actions)
			return null
		}
		
		// first case scenario
		if (isNaN(action.time)) {
		//	console.log('start')
			this.actions.shift()
			return this.getPosition(time)
		}

		let timeDelta = Number((Date.now() - time))

		// todo - last finsh state
		if (!action.position) {
		//	console.log('last')
			//console.log(this.prevAction.position)

			return this.prevAction? this.prevAction.position : null
		}
		
		// add timesplip to compensate playback
		if (!this.timeSlip && action.time < timeDelta) {
			// adjust timeslip - once
			this.timeSlip = timeDelta - action.time
			console.log('R/adjust timeslip', this.timeSlip)

		}

		// compare time with event.time
		timeDelta = action.time - timeDelta+this.timeSlip
		if (timeDelta < 0) {
	//		console.log(timeDelta, this.timeSlip)
			
			if (timeDelta < -10) {
				//state.repositionPlayer(action.pos)
			}
			
			this.prevAction = action
			this.actions.shift()			
		//	console.log('new', action)
			return action.position

		} else {
			if (this.prevAction !== undefined && this.prevAction.position !== undefined) {
			//	console.log('previous', this.prevAction)
				return this.prevAction.position

			} else {
				console.log('R/none', this.action, this.prevAction)
				return null

			}
		}
	}
}
