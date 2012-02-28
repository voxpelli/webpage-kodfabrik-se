<?php
$acct = FALSE;

if (isset($_GET['q'])) {
	$acct = $_GET['q'];
	if (strpos('acct:', $_GET['q']) !== 0) {
		$acct = 'acct:' . $acct;
	}
	$acct = ($acct === 'acct:pelle@kodfabrik.se');
}

if (!$acct) {
	header("HTTP/1.1 404 Not Found");
	die;
}

if (!empty($_GET['json'])) {
	header('Content-type: application/json');
	echo json_encode(array(
		'subject' => 'acct:pelle@kodfabrik.se',
		'aliases' => array('http://kodfabrik.se/'),
		'links' => array(
			array(
				'rel' => 'http://webfinger.net/rel/profile-page',
				'type' => 'text/html',
				'href' => 'http://kodfabrik.se/',
			),
			array(
				'rel' => 'http://microformats.org/profile/hcard',
				'type' => 'text/html',
				'href' => 'http://kodfabrik.se/',
			),
			array(
				'rel' => 'http://gmpg.org/xfn/11',
				'type' => 'text/html',
				'href' => 'http://kodfabrik.se/',
			),
			array(
				'rel' => 'describedby',
				'type' => 'text/html',
				'href' => 'http://kodfabrik.se/',
			),
		),
	));
} else {
	header('Content-type: application/xrd+xml');
	echo "<?xml version='1.0'?>\n";
?><XRD xmlns='http://docs.oasis-open.org/ns/xri/xrd-1.0'>
	<Subject>acct:pelle@kodfabrik.se</Subject>
	<Alias>http://kodfabrik.se/</Alias>
	<Link rel='http://webfinger.net/rel/profile-page' href='http://kodfabrik.se/' type='text/html'/>
	<Link rel='http://microformats.org/profile/hcard' href='http://kodfabrik.se/' type='text/html'/>
	<Link rel='http://gmpg.org/xfn/11' href='http://kodfabrik.se/' type='text/html'/>
	<Link rel='describedby' href='http://kodfabrik.se/' type='text/html'/>
</XRD><?php
}
