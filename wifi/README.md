iwlist wlan0 scan

sudo nano /etc/wpa.conf

network={
ssid="YOUR-SSID"
proto=RSN
key_mgmt=WPA-PSK
pairwise=CCMP TKIP
group=CCMP TKIP
psk="WPA-PASSWORD"
}

sudo nano /etc/network/interfaces

Used by ifup(8) and ifdown(8). See the interfaces(5) manpage or
/usr/share/doc/ifupdown/examples for more information.

auto lo

iface lo inet loopback
iface eth0 inet dhcp

auto wlan0
iface wlan0 inet dhcp
wpa-conf /etc/wpa.conf

sudo /etc/init.d/networking restart

