import Ember from 'ember';
import layout from './template';

const {
	$,
	Component,
	on
} = Ember;

/**
 * `draggable-wrapper` is a block component for wrapping draggable content that
 * can be repositioned.
 *
 * @class DraggableWrapper
 */
const DraggableWrapper = Component.extend({
	layout,

	classNames: [
		'draggable-wrapper'
	],

	classNameBindings: [
		'isDragging:draggable-wrapper--is-dragging'
	],

	draggable: true,
	elementWidth: 0,
	elementHeight: 0,
	invisibleClone: null,
	isDragging: false,

	/**
	 * Binds mouse events on element insertion.
	 */
	bindDrag: on('didInsertElement', function() {
		let _this = this;
		let elID = this.get('elementId');

		this.$().on(`mousedown.${elID}`,	function(e) { _this.handleDragStart(e);	});
		$(window).on(`mousemove.${elID}`,	function(e) { _this.handleDrag(e);			});
		this.$().on(`mouseup.${elID}`,		function(e) { _this.handleDragEnd(e);		});
	}),

	/**
	 * Unbinds mouse event bindings on component destruction.
	 */
	unbindDrag: on('willDestroyElement', function() {
		let elID = this.get('elementId');

		this.$().off(`mousedown.${elID}`);
		$(window).off(`mousemove.${elID}`);
		this.$().off(`mouseup.${elID}`);
	}),

	/**
	 * Handle the drag start event. Initializes dragging state and records the
	 * mouse position's offset from the top left of the dragged element so that
	 * future position updates take it into account.
	 *
	 * @param {Object} jQuery event object
	 */
	handleDragStart(e) {
		let offset = this.$().offset();

		this.setProperties({
			elementHeight: this.$().height(),
			elementWidth: this.$().width(),
			isDragging: true,
			offsetX: e.clientX - offset.left,
			offsetY: e.clientY - offset.top
		});
	},

	/**
	 * Handle the drag end event. Clears any styles and tears down dragging state.
	 */
	handleDragEnd() {
		this.$().attr('style', '');

		this.set('isDragging', false);
	},

	/**
	 * Handle the drag event. While dragging, updates the element's styles to
	 * reflect the current mouse position.
	 *
	 * @param {Object} jQuery event object
	 */
	handleDrag(e) {
		if (!this.get('isDragging')) {
			return;
		}

		let newStyles = {
			height: this.get('elementHeight') + 'px',
			left: e.clientX - this.get('offsetX'),
			position: 'absolute',
			top: e.clientY - this.get('offsetY'),
			width: this.get('elementWidth') + 'px'
		};

		this.$().css(newStyles);
	},
});

DraggableWrapper.toString = () => 'DraggableWrapper';

export default DraggableWrapper;
