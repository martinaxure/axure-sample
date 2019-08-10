using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace svc.Hubs {
    public struct Point {
        public int x;
        public int y;
    }

    public struct Size {
        public int width;
        public int height;
    }

    public struct Rect {
        public Point location;
        public Size size;
    }
    public class EditorHub : Hub {
        public async Task SelectionChanged(Rect r) {
            Console.WriteLine($"message x:{r.location.x}, y:{r.location.y}");
            await Clients.AllExcept(Context.ConnectionId).SendAsync("selectionChanged", r);
        }

        public async Task SelectionFinished() {
            // Console.WriteLine($"message x:{p.x}, y:{p.y}");
            await Clients.AllExcept(Context.ConnectionId).SendAsync("selectionFinished");
        }
    }
}