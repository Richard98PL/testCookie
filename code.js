<script>
const productPagesMap = new Map();
productPagesMap.set('review-and-design', 'REVIEWANDDESIGN');
productPagesMap.set('salesforce-implementations', 'SALESFORCEIMPLEMENTATIONS');
productPagesMap.set('marketing-excellence', 'MARKETINGEXCELLENCE');
productPagesMap.set('project-recovery', 'PROJECTRECOVERY');
productPagesMap.set('salesforce-platform-maintenance', 'SALESFORCEMAINTENANCE');
productPagesMap.set('ai', 'SPINOR');

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else {
		begin += 2;
		var end = document.cookie.indexOf(";", begin);
		if (end == -1) {
			end = dc.length;
		}
	}

	return decodeURI(dc.substring(begin + prefix.length, end));
}

String.prototype.hashCode = function() {
	let hash = 0;
	if (this.length === 0) return hash;
	for (let i = 0; i < this.length; i++) {
		let chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	console.log('hash ' + hash);
	return hash >>> 0;
}

document.addEventListener('DOMContentLoaded', (event) => {

	let pageNameMapped = '';

	let merged = location.host + location.pathname;

	if (!merged.endsWith('/')) {
		merged += '/';
	}

	let partsOfUrl = merged.split('/');
	const pageName = partsOfUrl[partsOfUrl.length - 2];



	if (productPagesMap.has(pageName)) {
		pageNameMapped = productPagesMap.get(pageName);
	}
	if (pageName.includes('.eu') || pageName.includes('.one')) {
		pageNameMapped = 'home';
	}


	let activity;
	if (document.URL.includes('cid=')) {
		activity = 'email_link_clicked';
	} else if (pageNameMapped === 'home') {
		activity = 'home_page_view';
	} else if (pageNameMapped !== '') {
		activity = 'product_page_view';
	} else {
		activity = 'content_page_view';
		pageNameMapped = pageName;
	}


	const currentURL = new URL(document.URL);

  let utmSource = currentURL.searchParams.get('utm_source') || sessionStorage.getItem('utm_source');
  let utmMedium = currentURL.searchParams.get('utm_medium') || sessionStorage.getItem('utm_medium');
  let utmCampaign = currentURL.searchParams.get('utm_campaign') || sessionStorage.getItem('utm_campaign');
  let utmTerm = currentURL.searchParams.get('utm_term') || sessionStorage.getItem('utm_term');
  let utmContent = currentURL.searchParams.get('utm_content') || sessionStorage.getItem('utm_content');

  if (utmSource) {
    sessionStorage.setItem('utm_source', utmSource);
  }
  if (utmMedium) {
    sessionStorage.setItem('utm_medium', utmMedium);
  }
  if (utmCampaign) {
    sessionStorage.setItem('utm_campaign', utmCampaign);
  }
  if (utmTerm) {
    sessionStorage.setItem('utm_term', utmTerm);
  }
  if (utmContent) {
    sessionStorage.setItem('utm_content', utmContent);
  }

	let existingCookie;
	let hash;
	try {
		existingCookie = getCookie('genusTrack');
		hash = existingCookie;
	} catch (error) {
		console.log(error);
	}

	if (!existingCookie || 
      existingCookie.indexOf('.') >= 0 || 
      existingCookie.indexOf('-') >= 0 || 
      existingCookie.indexOf(' ') >= 0 || 
      existingCookie.indexOf('-') >= 0) {
		let dt = new Date().getTime();
		let newHash = dt + navigator.language + navigator.platform;
		hash = newHash.hashCode();
		let cookie = 'genusTrack' + '=' + hash + ';path=/; expires=Wed, 08 Oct 2031 10:09:04 GMT; Secure; SameSite=None';
		document.cookie = cookie;

	}

	let img = document.createElement('img');
	let url_val = new URL(document.location);
	const urlParams = new URLSearchParams(window.location.search);
	const paramsMap = new Map();

	for (const [key, value] of urlParams.entries()) {
		paramsMap.set(key, value);
	}

	paramsMap.set('activity', encodeURI(activity));
	paramsMap.set('cookie1', encodeURI(hash));
	paramsMap.set('device', encodeURI(navigator.platform));
	paramsMap.set('lang', encodeURI(navigator.language));
	paramsMap.set('ip', userIP);

	img.src =
		'https://customer-tracking-node.herokuapp.com?metadata=' + pageNameMapped;
	for (const [key, value] of paramsMap) {
		img.src += '&' + key + '=' + value;
	}

	img.src += '&url=' + ("https://" + merged);
	img.style = "display: none";
	document.getElementsByTagName('body')[0].appendChild(img);
});

</script> 
