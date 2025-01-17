Title: Frequently Asked Questions
Slug: faq

#### How can I get active and participate?

Start using JShelter and tell your friends. You can fill an issue or pick up an
issue and start working on JShelter. You can track the development in our
[repository](https://pagure.io/JShelter/webextension). Please let us know
before you start implementing, preferably directly in the issue. You can
contact us by e-mail at jshelter@gnu.org. We have a [mailing
list](https://lists.nongnu.org/archive/html/js-shield/).

#### What is the current JShelter status? Is it ready, or is it still a work in progress?

We think that JShelter is ready to be used for everyday browsing. We believe that JShelter
in the current state fulfils the goal of giving you control over your browser and the APIs available for the web page.

We believe that the `Recommended` level changes your fingerprint, so typical fingerprinting scripts will fail to correlate your cross-origin activities and activities on the same origin during
different browser sessions. See the answers below for possible caveats.

Test your browser on common fingerprinting testers. Then use the `Strict` level
and test again to see that it considerably lowers the information about your computer.:

* [JShelter test page](https://polcak.github.io/jsrestrictor/test/test.html)
* [Am I unique?](https://amiunique.org/)
* [EFF Cover your tracks](https://coveryourtracks.eff.org/)
* [Tor Browser project fingerprinting page](http://fpcentral.tbb.torproject.org/)
* [Audio and font fingerprinting](https://audiofingerprint.openwpm.com/)
* [Device info](https://www.deviceinfo.me/)
* [Bromite](https://www.bromite.org/detect)
* [Browser leaks](https://browserleaks.com/)

At the same time, we are aware of several JShelter
[bugs and issues](https://pagure.io/JShelter/webextension/issues/).
We are working on making JShelter bug-free. We do not want to break benign
pages. Fixing some issues takes time. Other issues need balancing between several options.
JShelter is not perfect yet. JShelter is meant to be used with (ad)blockers like [uBlock
Origin](https://github.com/gorhill/uBlock#ublock-origin). Using a blocker will make your online
activities considerably safer. At the same time, it will make JShelter break fewer sites.

Right now, JShelter will need more interaction from you than we would prefer. Some
protection needs improvements. Some functionality needs to be included. When we achieve the state of fixing
the bugs and making JShelter easy to manage, we will release version 1.0. If you are not willing to
tweak JShelter occasionally, consider returning once we release version 1.0. Otherwise, try
other options; see the answers below.

#### What is the best source of information about JShelter?

The best sources for JShelter information can be found on
[our website](https://jshelter.org/) and our
[paper](https://arxiv.org/abs/2204.01392).

#### What is the threat model?

We created a [dedicated page describing the threat model](/threatmodel/) of JShelter.
You should read the page before you install the extension. Make sure that JShelter aligns with the threats you see on the web.

#### What is the white lies approach to protect from fingerprinters?

Please [see the blog post](/farbling/).

#### What is the difference between the white lies approach to protect from fingerprinters and farbling?

None. Both refer to the same technique. See the previous question.

#### How can I fix videos if they fail to play or retrieve data in time?

JShelter reimplements more than 100 JavaScript APIs. However, pages can use several ways to access the
same API. Unfortunately, browsers do not allow patching every possibility consistently through a simple call. Web Workers are one of the possibilities to access the APIs. Our ultimate goal is to patch APIs consistently. However, patching Web Worker is tricky and so far, we did not find a way how to patch Workers seemlessly. Our ultimate goal was to replace Workers with synchronous code. However, so far we offer only policies that either disable Workers or make them unoperable.

We are [working](https://pagure.io/JShelter/webextension/issue/43) on [improvements](https://pagure.io/JShelter/webextension/issue/80). Currently, we patch Web Workers in the `Recommended` level (`Strict` policy). Nevertheless, the method breakes Web Workers, and they cannot be used for benign purposes. The page also cannot detect the breakage to limit fingerprintability of the browsers.

JShelter users reported that video streaming servers are often affected. We encontered pages that
detect the presence of Web Worker support in browsers and provide polyfills if they do not detect
Web Worker support. The `Remove` WebWorker policy is ideal for such servers. The page can easily
detect missing Web Worker support. If a page provides its own alternatives like polyfills, those do
not have the powers of Web Workers so you can make the page work at a cost of increased
fingerprintability. Use FPD to evaluate that threat.

If you believe the server
operator that they and/or their partners do not misuse Web Workers to access original APIs or if you
do not mind,
change the `WebWorker` policy from `Strict` to `Low` (in Chrome) or disable it completely
([in Firefox](https://pagure.io/JShelter/webextension/issue/80)). Videos and other functionality
requiring Web Workers should
work. To change the policy, follow these steps:

1. Navigate to a page with a video you want to watch.
1. Click on the JShelter toolbar icon (typically next to your navigarion bar, if you cannot locate
   the icon keep reading below).
1. Click on the `Modify` button.
1. Click on the `Detail tweaks of JS shield for this site` button.
1. Click and drag the `WebWorker` slider to the left until `Strict` is replaced
   by the `Low` value (Chromium-based browser) or `Unprotected` (Firefox).
1. Click on the `Refresh page` button at the top.
1. Watch the video.

#### I want to use a website that uses Web Workers, but it is broken. How can I fix the site?

See the previous question.

#### What are Web Workers and what are the threats that I face?

In essence, Web Workers are threat for JShelter users for two reasons:

1. They allow accessing some of the modified APIs. There is no simple call that JShelter can issue
   to apply the modifications to Web Workers. So if you do not apply WebWorker protection you risk
   that other protections can be removed by Web Workers.
2. They increase the capabilities of attackers. For example, malicious actors can install long-lived
   proxies to the browser.

For more details, see [Web Worker
documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), the [explanation of using Web Workers as Man-In-The-Middle proxy](https://betterprogramming.pub/man-in-the-middle-attacks-via-javascript-service-workers-52647ac929a2), papers like [Assessing the threat of web worker distributed attacks](https://www.researchgate.net/publication/313953354_Assessing_the_threat_of_web_worker_distributed_attacks), and other [works](http://www.diva-portal.se/smash/get/diva2:1218197/FULLTEXT01.pdf).

#### Can I see a JShelter icon next to my navigation bar? I want to interact with the extension easily and avoid going through settings.

JShelter has a toolbar icon that allows you to open the popup (see below). However, browsers tend
to hide the icon. If you cannot see a JShelter icon to the right of the bar where you enter URLs.
Try to:

1. Click on the extension icon (typically looks like a puzzle tile).
2. Pin Jshelter to the toolbar.

The figure below shows how to accomplish these two steps in Firefox and a Chromium-based browser.

![Pin JShelter to Firefox toolbar]({attach}/images/faq/firefox_pintoolbar.png)
![Pin JShelter to a Chromium-based browser toolbar]({attach}/images/faq/chromium_pintoolbar.png)

#### I visited a page, and it is broken because of JShelter. What should I do?

This happens from time to time. We want to eliminate such pages, but JShelter is not there yet (see
also above).

Your page might be broken because [Network Boundary Shield](/nbs/) (NBS) or [fingerprint
Detector](/fpd/) (FPD) detected a problem. You should have seen a notification in such cases unless
you turned notifications off. We do not recommend turning notifications off (see below). Whenever NBS or FPD detect
a possible problem on the site, it is up to you to decide if you believe the owner of the visited page or are tempted
to view the content so much that you turn the protection off.

##### Fingerprint Detector (FPD)

If you see a notification like:

![Fingerprint Detector notification]({attach}/images/fpdetection/notifications.png)

In this case, FPD evaluated that the page tries to fingerprint you. FPD can be optionally configured
to prevent uploading the fingerprint to the server. In that case, FPD blocks all further requests of
the visited page and removes the storages available to the page. Some web pages employ browser
fingerprinting for security purposes. You might want to allow the page to fingerprint
you in such a case. Open the popup by clicking on the JShelter logo badge icon and turn off the FPD for
the visited site.

![Turn FPD off](/images/faq/fpd_off.png)

The depicted setting will turn FPD off for all pages of the visited origin. If you want to disable FPD for
all pages, change the `Global settings`.

##### Network Boundary Shield (NBS)

If you see a notification like:

![JShelter blocks the scan]({attach}/images/portscan-2_request_blocked.png)

Then, it was NBS that blocked some requests. Rarely can some pages be broken because they require interaction between the public Internet and the local network. For example, the Network Boundary Shield might break some intranet information systems. JShelter users also reported an increased number of false positives when using DNS-based filtering programs. If you use one, make sure that DNS returns 0.0.0.0 for the blocked domains.

![Turn NBS off](/images/faq/nbs_off.png)

The depicted setting will turn NBS off for all pages of the visited origin. If you want to disable NBS for
all pages, change the `Global settings`.

##### JavaScript Shield (JSS)

If you have not seen any notifications (and didn't disable notifications manually), it is JavaScript
Shield (JSS) that might have broken the page. Depending on your courage, try:

###### Disable JSS for this domain

You can disable JSS for all pages on the visited domain by turning JSS off:

![Turn JSS off](/images/faq/jss_off.png)

###### Disable JSS for this domain

Advanced users can change JSS level:

1. Spoofing API calls results takes some resources. If you see that the page does not try to fingerprint you, you might want to disable all fingerprinting protection.
2. Click the `Modify` button next to the JavaScript Shield label.
3. Select `Turn fingerprinting protection off level`. This will keep security-related wrappers but
	 all fingerprinting protection will be disabled.

![Turn JSS fingerprinting protection off](/images/faq/jss_low.png)

You can create your own JSS protection levels on the `Global settings` page.

###### Tweak JSS for this domain

Sometimes you will want to tweak JSS a little bit. For example, you generally do not need audio. Still, you might want to make a call on some pages. Or, you generally do not want to reveal your location, but you
want to use a map page to navigate. Occasionally, a JSS can modify an API in a way that breaks a page.
In that case, you might want to tweak your protection level.

1. Click the `Modify` button next to the JavaScript Shield label.
2. Click the `Detail tweaks of JS Shield for this site` button.

![Go to tweaking JSS mode](/images/faq/jss_tweak_start.png)

The JSS section will expand. The applied protection groups are sorted depending on the number of calls of
each API group. Typically, you will want to tweak the settings of one of the groups with the most
calls. See the highlighted column:

![Tweaking JSS mode](/images/faq/jss_tweak_sorting.png)

1. Before you tweak any wrapping group, see the description.
2. Tweak the protection according to your need.

![Tweaking JSS mode](/images/faq/jss_tweaking.png)

#### A site opened a popup window, I want to tweak settings for that window, but I do not see a badge JShelter icon there. How can I tweak JShelter settings?

If you are using Firefox:

1. Open `about:config`, click to `Accept the Risk and Continue`,
1. set `browser.link.open_newwindow` to `3`,
1. set `browser.link.open_newwindow.restriction` to `0`.

This will force all popup windows to open in a new tab, meaning the JShelter settings could be adjusted easily everywhere.

#### Why do I see so many notifications from JShelter?

Generally speaking, you should see only a few notifications by JShelter. The default settings are
tailored to give the user critical information about JShelter behaviour and its possible changes to
the page's ability to make network requests that often break the page's behaviour.

We suggest installing a tracker blocker like uBlock Origin. The blocker will eliminate the most
common security and privacy threats.

Also, see the next question.

##### I am seeing too many NBS notifications

NBS protects from attacks that occur very rarely. JShelter users often complain about too many
notifications when they employ DNS-based blocking. DNS-blocking resolver resolves predefined domains
to a fake IP address, usually `0.0.0.0` or `127.0.0.1` (IPv4) and `::` or `::1` (IPv6). If your
DNS-blocking resolver returns `127.0.0.1` and `::1`. Please, reconfigure the resolver to return `0.0.0.0` or `::`.

1. Depending on your OS, you will consume fewer resources. For example, Windows machines do not create any TCP stream when a website connects to `0.0.0.0` or `::`, but it creates a TCP stream to `127.0.0.1` and `::1`. Hence, a remote web page can access a web server if it is running on the local machine. Note that Linux hosts try to establish a connection to a localhost port on all these addresses.
2. If your DNS-based filtering returns `0.0.0.0` or `::`, it will give JShelter a report on the
	 intentions. If it returns `127.0.0.1` or `::1`, JShelter has no way to differentiate between such
	 DNS blocker and an attack like the one in the [blog](/localportscanning/).

#### Does JShelter protect my IP address?

No, and it never will. You need to find a VPN, Tor, or a similar technique to hide your IP address.

#### Does JShelter replace a tracker blocker?

No, many extensions specialize in list-based tracking. We consider list-based
tracking out-of-scope of the JShelter mission. You should keep using a tracker blocker like [uBlock
Origin](https://github.com/gorhill/uBlock#ublock-origin) in parallel with JShelter.

#### I already have a blocking extension installed. Do I need JShelter?

Blocking extensions are typically based on a list of commonly known malicious URLs. Hence, someone
needs to discover such a URL first. Some malicious URLs are never added to blocking lists because they were not discovered. Others might be
added to a small or specialized list only. JShelter protects you from some threats
not yet added to the lists.

Some login pages fingerprint you during the login process. But you might want to keep your
specific device configuration private from such a page. JShelter can limit (`Strict` level) or fake
(`Recommended` level) information commonly used for browser fingerprinting.

#### Does JShelter modify identifiers in cookies, web storage or other tracking IDs?

Not directly. Use other tools to block such trackers. Firefox's built-in protection mechanisms and
tracker blockers are excellent tools that complement JShelter well.

Nevertheless, some IDs might be derived based on fingerprinting scripts. In that case, JShelter
will modify such ID, and depending on the implementation and your JShelter settings, your identity
might change for each visited origin and each session.

#### What other extension do you recommend to run along JShelter?

We consider a tracker blocker like [uBlock Origin](https://github.com/gorhill/uBlock#ublock-origin)
as a must. It will make your browsing faster, make your pages clean and improve your privacy.
Nevertheless, it is easy to evade blockers. The malicious web server needs to change the URL of the
script. JShelter developers encountered several malicious scripts that evaded common lists. Hence,
blocklist-based filtering is beneficial as a first-line defence. However, blockers are not enough
as niche cases evade the blockers.

Web extensions like [NoScript Security Suite](https://noscript.net/) or
[uMatrix](https://github.com/gorhill/uMatrix) allow users to block JavaScript or other content,
either completely or per domain. However, the user needs to evaluate which domains to allow scripts.
[HTTP Archive reports](https://httparchive.org/reports/page-weight?start=earliest&end=latest&view=list#reqJs)
that an average page includes (at the time of writing this text) 22 external requests (21 requests for
mobile devices). Many pages depend on JavaScript. Users must select what content to trust. A typical
page contains resources from many external sources, so such a user requires excellent knowledge.
Moreover, malicious code may be only a part of a resource; the rest of the resource can be
necessary for correct page functionality. We believe that web extensions like NoScript Security
Suite and uMatrix origin are good but do not protect the user from accidentally allowing malicious
code. The NoScript Suite main developer is a part of the JShelter team, and JShelter shares a lot of
code with NoScript.

We suggest that you use other extensions like [Cookie
AutoDelete](https://github.com/Cookie-AutoDelete/Cookie-AutoDelete),
[Decentraleyes](https://decentraleyes.org), [ClearURLs](https://docs.clearurls.xyz). All these
extensions are important in making your browser leak as little data as possible, and all
these protections are out-of-scope of JShelter.

#### I am using Firefox Fingerprinting Protection (resistFingerprinting). Should I continue? Should I turn Firefox Fingerprinting Protection on?

Mozilla is working on integrating fingerprinting resisting techniques [from
Torbrowser](https://bugzilla.mozilla.org/show_bug.cgi?id=1329996) to Firefox (Firefox Fingerprinting
Protection, also known as resist fingerprinting). However, the work is not done. Firefox
Fingerprinting Protection tries to confuse simple fingerprinters with random data. Sophisticated fingerprinters will create a [homogeneous fingerprint](/fingerprinting/). It is a research
question if the homogeneous fingerprint strategy makes sense before it is adopted by all users.

Moreover, inconsistencies arise. For example, Torbrowser does not implement WebGL. As Firefox adopts
fingerprinting protections from Torbrowser, Firefox modifies readings from 2D canvas and does not
modify WebGL canvas. That creates a false sense of protection. JShelter modifies 2D and WebGL canvas
consistently.

Firefox Fingerprinting Protection may be useful for cases like having an ordinary laptop with default
settings that changes IP addresses a lot. But if you like to have the same fingerprint as many other
users, we suggest that you use Tor Browser.

You cannot tweak Firefox Fingerprinting Protection. You must activate all or nothing. JShelter
provides options to modify behaviour per domain.

#### Should I install JShelter if I am using Brave browser?

Many JShelter protections come from Brave. While JShelter offers some additional protections, the
key parts are shared with Brave. You should not use JavaScript Shield or you should tweak its levels to remove duplicates. You
should use Network Boundary Shield and Fingerprint Detector. While we keep a close eye on Brave
protection, we do not offer any protection specifically tailored for Brave. If you have one, please,
let us know.

#### I am using some other anti-fingerprinting extension. Should I continue? Should I combine such extensions?

You should consider (at least) the following. But first, see our blog
post on [fingerprinting](/fingerprinting/).

JSS modifies your fingerprint while FPD detects or prevents (if allowed) fingerprinting. If you
combine more approaches to modify the fingerprint, the results are not predictable.
All extensions might modify the same or similar data, or they might modify different APIs.
If you use multiple approaches that focus on different APIs, you
might be less fingerprintable. However, you might as well use a unique combination and be easily
fingerprintable by a focused or advanced fingerprinter.

Let us see an example. Suppose that you install an extension A that modifies the content of the
canvas element. As JShelter modifies only data during reading from canvas, it will apply its
countermeasures after the countermeasures of A. In `Strict` level, it will override all
modifications by A. The white lies approach would slightly modify the modifications of A. That would
likely be pointless or even counterproductive.

Now, consider another extension B that modifies the read data as well. Both extensions try to change the same APIs, which likely creates a race condition on which defence mechanism wins. If it is indeed the race condition, you may be fingerprintable better as the one who uses both B and JShelter or less because the fingerprinter sees different fingerprints. Which one is correct depends on how smart and focused the fingerprinter is.

Jshelter tries to apply consistent modifications. However, if B modifies only a subset of APIs that
JShelter modifies, an advanced fingerprinter can misuse that information to improve the fingerprint.

If you use more approaches similar to FPD, they will likely not interact badly with each other.

You can tweak JShelter to apply only some protections. For example, by creating your own JSS levels.
You can also use the "Turn fingerprinting protection off" built-in level to keep the
non-fingerprinting countermeasures. You can also turn JSS off and benefit from FPD and NBS.

JShelter includes advanced techniques through [NSCL](https://noscript.net/commons-library) to inject
API wrappers in time and reliably. Other extensions might not apply their protection reliably. See
also the question on Firefox bug [1267027](https://bugzilla.mozilla.org/show_bug.cgi?id=1267027)
below.

Most other tools focus on [homogeneous fingerprints](/fingerprinting/). By running the `Recommended`
JShelter JSS level, you will modify the fingerprint and create a very small group, likely consisting
only of you. Nevertheless, some fingerprinters can be confused even in that case so that you might be less identifiable
by such dumb fingerprinters.

Suppose a dumb fingerprinter that creates a single number by combining all fingerprintable data. As
JShelter modifies the APIs differently in each session and on each domain. There is no point in
installing other fingerprint-modifying extensions.

Suppose a more clever fingerprinter that somehow analyses the fingerprintable data. It might detect
that you use JShelter or a similar approach. However, it is possible that the analysis fails in case
of unexpected behaviour of multiple extensions, so multiple extensions might help you confuse the fingerprinter.

An even more clever fingerprinter can focus on unique traits of your extensions (that modify the
page, including page decorators or extensions that include buttons to the page, like downloaders or
password managers. As the JShelter's [threat model](/threatmodel/) does not protect from such
fingerprinters, you will be better if you do not let JShelter modify the fingerprint.

#### Is browser fingerprinting a real threat?

More than 100 advertisement companies reveal in the [adtech transparency a consent
framework](https://www.fit.vutbr.cz/~polcak/tcf/tcf2.html) that they actually actively scan device
characteristics for identification: devices can be identified based on a scan of the device's unique
combination of characteristics. Vendors can create an identifier using data collected via actively
scanning a device for specific characteristics, e.g. installed fonts or screen resolution, use such
an identifier to re-identify a device.

![TCF participants actively scanning devices to create a fingerprint](https://www.fit.vutbr.cz/~polcak/tcf/graphs/v2sf2.svg)

See papers like [Browser Fingerprinting: A survey](https://arxiv.org/pdf/1905.01051.pdf), [Fingerprinting the Fingerprinters](https://uiowa-irl.github.io/FP-Inspector/) or [The Elephant in the Background](https://fpmon.github.io/fingerprinting-monitor/files/FPMON.pdf).

#### My bank (or another trusted site) fingerprinted me during a login attempt. Should I worry?

Browser fingerprinting is a common part of multi-factor authentication. The provider tries to
protect your account. So you should not worry, but you might be forced to deactivate FPD for that site.
However, we suggest that you do not turn off JavaScript Shield and its anti-fingerprinting
protections.

From the European perspective, [WP29 clarified](https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2014/wp224_en.pdf) (use case 7.5) that user-centric security can be viewed as strictly necessary to provide
a web service. So it seems likely that browser fingerprinting for security reasons does
trigger the ePrivacy exception and user consent is not necessary.
Depending on the circumstances, a fingerprint can be personal data. GDPR might also apply.
GDPR lists security as a possible legitimate interest of a data controller, see
recital 49. Nevertheless, if all fingerprinting is proportionate is an open question.

We understand that our users do not want to easily give information about their devices. Hence, we
suggest having JavaScript Shield active on fingerprinting sites. It is up to you if you want to
provide as low information as possible (`Strict` level), want to have a different fingerprint every
visit (`Recommended` level, keep in mind that you are providing your login, so your actions are
linkable), or you want to create your own level.

#### Do you protect against font enumeration fingerprinting?

No. We currently do not have a consistent method that spoofs fonts reliably. If you are concerned
about font enumeration, you can track the relevant JShelter [issue](https://pagure.io/JShelter/webextension/issue/60).

If you are using Firefox and want your fonts hidden consistently, activate resistFingerprinting (see
above).

#### I have a unique fingerprint? Some properties wrapped by JShelter return random values.

First, see our [blog post](/fingerprinting/).

JShelter indeed modifies some properties like WebGL strings (`renderer`, `vendor`) to random
strings in the `Recommended` level. JShelter also does not modify random identifiers of microphones and
cameras. All these properties contain random strings that uniquely identify your browser session.

JShelter provides different lies on different domains, so cross-domain linking is hard.
But remember that a single domain can link all your activities during a browser session.
If you do not want JShelter to generate the random strings, use `Strict` protection (but see other FAQ entries).

We are [considering](https://pagure.io/JShelter/webextension/issue/68) adding better control for the white lies approach.

We are also [considering](https://pagure.io/JShelter/webextension/issue/69) replacing the random strings of the Web GL API with real-world strings. However, we do not have such a database. We are also worried about creating inconsistencies if we apply invalid combinations of real-world strings. As creating the real-world database would take a lot of time, and a dedicated fingerprinter might reveal the inconsistencies anyway, we do not actively work on the issue.

#### Does JShelter completely prevent browser fingerprinting?

No. See the [threat model](/threatmodel/). As explained there, JShelter applies reasonable
precautions but:

1. There is no clear boundary between fingerprinting and benign behaviour.
1. A fingerprinter might deploy focused attacks. While we try to deploy undetectable and reasonable
   countermeasures, expect that a focused and motivated attacker will be able to detect JShelter
   users.
1. We expect that users will run FPD and JSS in parallel. As both protect from fingerprinting
   differently, they complement each other.

Also, read the answer below.

#### What JShelter configuration should I pick?

First, see our [blog post](/fingerprinting/). Consult also other [blog posts](/blog/) and other
questions in this FAQ.

1. If you want to have the same fingerprint as many users, We suggest going for Tor Browser (do not install JShelter in Tor Browser).
1. If you want to make cross-site fingerprinting linkage hard, go for the `Recommended` JShelter level. If you want better protection for the real data at the cost of having the same fingerprint on different sites, go for the `Strict` JShelter level.
1. Keep NBS active.
1. If you want to detect and prevent fingerprinting attempts, use FPD.

#### Does FPD collect a list of pages/origins that fingerprinted me?

No, FPD does not store any information. Each page load starts a new detection that is not dependant
on previous interactions between the browser and the site.

#### When FPD detects that an origin tried to fingerprint me, does it mean that the extension will apply stronger protection like switching to the `Strict` JSS level or applying the blocking of HTTP requests initiated by the domain?

No.

First of all, the `Strict` JSS level does not mean stronger protection from fingerprinting. In fact, it makes your
fingerprint stable. We do not recommend using `Strict` level as an anti-fingerprinting mechanism.

Secondly, fingerprinting is quite common on login pages. If one page fingerprints you, it does
not mean that all pages are going to fingerprint you.

Thirdly, the fingerprinting script may be loaded into the page irregularly. We want to prevent blocking the site when no fingerprinting is detected.

If you want to switch to a different level for the website, you can do so manually. We do not
recommend such action.

#### I saw several extensions that claim that it is not possible to modify the JavaScript environment reliably. Are you aware of the Firefox bug [1267027](https://bugzilla.mozilla.org/show_bug.cgi?id=1267027)

Yes, we are aware of the issues concerning reliable script injections before page scripts can
permanently access original API calls. In fact, JShelter (then JavaScript Restrictor)
[suffered from the bug](https://github.com/polcak/jsrestrictor/issues/25) for several versions.
JShelter integrates [NSCL](https://noscript.net/commons-library) that allows JShelter to insert its
scripts reliably before page scripts start running. Hence, the APIs are guaranteed to be
protected. NSCL provides a cross-browser layer that aims at modifying all ways to obtain API functions
like iframes, pages protected by CSP and others. See our
[paper](https://arxiv.org/pdf/1905.01051.pdf) for more details on the integration of NSCL to JShelter.

#### Why does JShelter/NSCL initiate web requests to ff00::?

First, see the previous question.

NSCL needs a synchronous way to transfer data between different scripts of the extension. Web
Extension APIs only allow asynchronous communication. But do not worry. The request is cancelled in
the [code](https://github.com/hackademix/nscl/blob/40e765f0d66a10b25a27a375bc62ea141a73734f/common/SyncMessage.js#L106).

Additionally [ff00::]

* is a [reserved multicast IPV6 address](https://www.iana.org/assignments/ipv6-multicast-addresses/ipv6-multicast-addresses.xhtml#ipv6-scope),
* hence, it is not a valid HTTP endpoint (if you try to navigate http://[ff00::] the browser will always tell you that the resource is unreachable),
* the [SyncMessage back-end cancels the webRequest](https://github.com/hackademix/nscl/blob/40e765f0d66a10b25a27a375bc62ea141a73734f/common/SyncMessage.js#L106).

Some tools can see such a request, but it will never leave your browser.

#### Does NBS work the same way in Firefox and Chromium-based browsers?

No. Firefox allows webextensions to perform DNS resolution of the domain name that the browser is
about to get information from. The resolution of the DNS name to an IP address is crucial for
FPD. As Firefox allows to perform the resolution before any request leaves the browser, JShelter can
prevent each attempt to cross the network boundary.

Chromium-based browsers do not offer the DNS resolution APIs. JShelter collects resolution results in
a cache that is filled during the processing of each request (after the browser makes the request).
That means that the first request for each domain name goes through. JShleter blocks all subsequent
requests only.

Keep in mind that an adversary can change the domain with each request. For example, the attacker
can use a.attacker.com, b.a.attacker.com, c.b.a.attacker.com in sequence for its requests to go
through. So it is easy for an attacker to bypass NBS. In practice, we know about attackers that do
not change domain names (for example, see [our blog](/localportscanning/)). So we keep the NBS in
Chromium-based browsers, even though it is not perfect.

#### How does NBS interact with proxies? Do my DNS requests leak through NBS?

If you are using a proxy, the attacks, which the NBS tries to prevent, go through the proxy to the local network of the
proxy (but keep in mind that this might not be true for more complex configurations).

NBS in Chromium-based browsers works the same way as it would work without the proxy. NBS
protects the local network of the proxy in that case. Depending on the deployment and exact
configuration, it may also protect your local network.

NBS in Firefox employs the DNS API that initiates DNS requests. Contextual identities allow users
to go through a proxy in some tabs and not in others. We decided not to perform DNS resolution in
NBS for proxied
requests. See <a href="https://pagure.io/JShelter/webextension/issue/41">issue 41</a> and <a
href="https://pagure.io/JShelter/webextension/issue/85">issue 85</a> for more details. We might
decide to reimplement NBS in Firefox similarly to the Chromium version in the future for proxied requests.
Another possible option, we might consider in the future, is adding a configuration option to
allow users to opt-in to perform DNS resolution in NBS, which would be useful for users running
an HTTP proxy in their local network.
If you have good arguments for changing the behaviour, please, share them with us.

#### What is the proper way to cite JShelter in a paper?

For now, cite our [ArXiv paper](https://arxiv.org/abs/2204.01392), for example, by
exporting the citation on ArXiv. We are working on other publications. We will update this answer
in the future.
