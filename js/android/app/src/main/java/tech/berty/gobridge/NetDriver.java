package tech.berty.gobridge;

import org.json.JSONArray;

import java.net.InterfaceAddress;
import java.net.NetworkInterface;

import java.util.Collections;

import bertybridge.NativeNetDriver;
import bertybridge.NetAddrs;

public class NetDriver implements NativeNetDriver {
    public NetAddrs interfaceAddrs() throws Exception {
        NetAddrs netaddrs = new NetAddrs();

        for (NetworkInterface nif : Collections.list(NetworkInterface.getNetworkInterfaces())) {
            try {
                for (InterfaceAddress ia : nif.getInterfaceAddresses()) {
                    String[] parts = ia.toString().split("/", 0);
                    if (parts.length > 1) {
                        netaddrs.appendAddr(parts[1]);
                    }
                }
            } catch (Exception ignored) {}
        }

        return netaddrs;
    }
}
