typography = {
	init: function() {
		typography.preventWidows();
	},
	preventWidows: function() {
		$('p, li, h1, h2, h3, h4, a').each(function() {
			var $this = $(this),
				textNodes = typography.getTextNodesIn(this);

			if ($this.css('display') == 'inline' || !textNodes.length)
				return;

			var lastTextNode = textNodes[textNodes.length - 1],
				text = lastTextNode.nodeValue;
			if (text.split(' ').length > 4) {
				var i = text.lastIndexOf(' ');
				text = text.substring(0, i) + unescape('\u00A0') + text.substring(i+1);
				lastTextNode.nodeValue = text;
			}
		});
	},
	getTextNodesIn: function(node, includeWhitespaceNodes) {
		var textNodes = [], whitespace = /^\s*$/;

		var getTextNodes = function(node) {
			if (node.nodeType == 3) {
				if (includeWhitespaceNodes || !whitespace.test(node.nodeValue)) {
					textNodes.push(node);
				}
			} else {
				for (var i = 0, len = node.childNodes.length; i < len; ++i) {
					getTextNodes(node.childNodes[i]);
				}
			}
		}

		getTextNodes(node);
		return textNodes;
	}
}

typography.init();