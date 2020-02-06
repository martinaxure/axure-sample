using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace svc.Hubs {
    public class Point {
        public int x;
        public int y;
    }

    public class Size {
        public int width;
        public int height;
    }

    public class Rect {
        public Point location;
        public Size size;
    }
    public class EditorHub : Hub {
        public async Task SelectionChanged(string r) {
            await Clients.AllExcept(Context.ConnectionId).SendAsync("selectionChanged", r);
        }

        public async Task SelectionFinished() {
            await Clients.AllExcept(Context.ConnectionId).SendAsync("selectionFinished");
        }
    }
}